import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import * as fs from 'fs';
import * as path from 'path';

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly sesClient: SESClient | null = null;
  private readonly senderEmail: string;

  constructor(private configService: ConfigService) {
    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>(
      'AWS_SECRET_ACCESS_KEY',
    );
    const region =
      this.configService.get<string>('AWS_REGION') || 'ap-southeast-2';
    this.senderEmail =
      this.configService.get<string>('AWS_SES_SENDER') ||
      'no-reply@localhost.local';

    if (accessKeyId && secretAccessKey) {
      this.sesClient = new SESClient({
        region,
        credentials: {
          accessKeyId,
          secretAccessKey,
        },
      });
      this.logger.log('AWS SES Email Provider initialized.');
    } else {
      this.logger.warn(
        'AWS Credentials missing. Falling back to local console/file email provider.',
      );
    }
  }

  async sendEmail(options: SendEmailOptions): Promise<void> {
    const { to, subject, html, text } = options;

    if (this.sesClient) {
      try {
        const command = new SendEmailCommand({
          Source: this.senderEmail,
          Destination: {
            ToAddresses: [to],
          },
          Message: {
            Subject: {
              Data: subject,
              Charset: 'UTF-8',
            },
            Body: {
              Html: {
                Data: html,
                Charset: 'UTF-8',
              },
              ...(text && {
                Text: {
                  Data: text,
                  Charset: 'UTF-8',
                },
              }),
            },
          },
        });
        await this.sesClient.send(command);
        this.logger.log(`Email successfully sent to ${to} via AWS SES.`);
      } catch (error) {
        const stack = error instanceof Error ? error.stack : '';
        this.logger.error(`Failed to send email to ${to} via AWS SES:`, stack);
        throw new Error('Email delivery failed.');
      }
    } else {
      // Fallback local development behavior
      const isProduction =
        process.env.NODE_ENV === 'production' ||
        process.env.NODE_ENV === 'staging';

      this.logger.log('==================================================');
      this.logger.log(`LOCAL EMAIL OUTBOX - Subject: "${subject}"`);
      this.logger.log(`To: ${to}`);
      if (!isProduction) {
        // Extract OTP or details from HTML if safe to log
        const otpMatch = html.match(/<span[^>]*>(\d{6})<\/span>/);
        if (otpMatch) {
          this.logger.log(`VERIFICATION CODE (OTP): ${otpMatch[1]}`);
        }
      }
      this.logger.log('==================================================');

      // Write to scratch/sent-emails.log for testing validation
      try {
        const artifactsDir =
          '/Users/abijithgkaimal/.gemini/antigravity-ide/brain/4b742f08-ec2a-4087-862f-ceea9c075353';
        const scratchDir = path.join(artifactsDir, 'scratch');
        if (!fs.existsSync(scratchDir)) {
          fs.mkdirSync(scratchDir, { recursive: true });
        }
        const logFile = path.join(scratchDir, 'sent-emails.log');
        const timestamp = new Date().toISOString();
        const logEntry = `[${timestamp}] To: ${to} | Subject: ${subject}\nBody:\n${html}\n\n==================================================\n\n`;
        fs.appendFileSync(logFile, logEntry);
      } catch (err) {
        this.logger.error(
          'Failed to write email to scratch/sent-emails.log:',
          err,
        );
      }
    }
  }

  async sendVerificationOtp(email: string, otp: string): Promise<void> {
    const template = this.getSignupOtpTemplate(otp);
    await this.sendEmail({
      to: email,
      subject: 'Verify Your Email - Jewelry by Zorucci',
      html: template,
    });
  }

  async sendPasswordResetOtp(email: string, otp: string): Promise<void> {
    const template = this.getPasswordResetTemplate(otp);
    await this.sendEmail({
      to: email,
      subject: 'Password Reset Request - Jewelry by Zorucci',
      html: template,
    });
  }

  private getSignupOtpTemplate(otp: string): string {
    return `
      <div style="font-family: 'Raleway', 'Helvetica Neue', Arial, sans-serif; background-color: #fafafa; padding: 40px; color: #111111; max-width: 600px; margin: 0 auto; border: 1px solid #e8dbb4;">
        <div style="text-align: center; margin-bottom: 30px;">
          <span style="color: #c59b27; font-size: 28px; font-weight: bold; letter-spacing: 0.1em;">JEWELRY BY ZORUCCI</span>
        </div>
        <div style="background-color: #ffffff; padding: 30px; border-radius: 4px; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
          <h2 style="font-size: 20px; font-weight: normal; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 0.05em; color: #111111;">Verify Your Email Address</h2>
          <p style="font-size: 14px; line-height: 1.6; color: #555555; margin-bottom: 25px;">Thank you for registering with Jewelry by Zorucci. Please use the following 6-digit verification code to complete your registration. This code will expire in 15 minutes.</p>
          <div style="text-align: center; margin: 30px 0;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 0.2em; color: #c59b27; border: 1px solid #e8dbb4; padding: 10px 20px; background-color: #faf8f2; display: inline-block;">${otp}</span>
          </div>
          <p style="font-size: 12px; line-height: 1.6; color: #888888; margin-top: 30px; border-top: 1px solid #fafafa; padding-top: 20px;">If you did not request this verification code, please ignore this email.</p>
        </div>
      </div>
    `;
  }

  private getPasswordResetTemplate(otp: string): string {
    return `
      <div style="font-family: 'Raleway', 'Helvetica Neue', Arial, sans-serif; background-color: #fafafa; padding: 40px; color: #111111; max-width: 600px; margin: 0 auto; border: 1px solid #e8dbb4;">
        <div style="text-align: center; margin-bottom: 30px;">
          <span style="color: #c59b27; font-size: 28px; font-weight: bold; letter-spacing: 0.1em;">JEWELRY BY ZORUCCI</span>
        </div>
        <div style="background-color: #ffffff; padding: 30px; border-radius: 4px; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
          <h2 style="font-size: 20px; font-weight: normal; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 0.05em; color: #111111;">Reset Your Password</h2>
          <p style="font-size: 14px; line-height: 1.6; color: #555555; margin-bottom: 25px;">We received a request to reset the password for your account. Please use the following 6-digit verification code to reset your password. This code will expire in 15 minutes.</p>
          <div style="text-align: center; margin: 30px 0;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 0.2em; color: #c59b27; border: 1px solid #e8dbb4; padding: 10px 20px; background-color: #faf8f2; display: inline-block;">${otp}</span>
          </div>
          <p style="font-size: 12px; line-height: 1.6; color: #888888; margin-top: 30px; border-top: 1px solid #fafafa; padding-top: 20px;">If you did not request a password reset, please ignore this email or contact support if you have concerns.</p>
        </div>
      </div>
    `;
  }
}
