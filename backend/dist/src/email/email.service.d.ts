import { ConfigService } from '@nestjs/config';
export interface SendEmailOptions {
    to: string;
    subject: string;
    html: string;
    text?: string;
}
export declare class EmailService {
    private configService;
    private readonly logger;
    private readonly sesClient;
    private readonly senderEmail;
    constructor(configService: ConfigService);
    sendEmail(options: SendEmailOptions): Promise<void>;
    sendVerificationOtp(email: string, otp: string): Promise<void>;
    sendPasswordResetOtp(email: string, otp: string): Promise<void>;
    private getSignupOtpTemplate;
    private getPasswordResetTemplate;
}
