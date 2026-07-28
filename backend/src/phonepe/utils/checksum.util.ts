import * as crypto from 'crypto';

export class ChecksumUtil {
  /**
   * Generates X-Verify header checksum for PhonePe payment request
   */
  static generatePayChecksum(base64Payload: string, apiEndpoint: string, saltKey: string, saltIndex: number): string {
    const dataToHash = base64Payload + apiEndpoint + saltKey;
    const hash = crypto.createHash('sha256').update(dataToHash).digest('hex');
    return `${hash}###${saltIndex}`;
  }

  /**
   * Generates X-Verify header checksum for PhonePe transaction status check
   */
  static generateStatusChecksum(merchantId: string, merchantTransactionId: string, saltKey: string, saltIndex: number): string {
    const dataToHash = `/pg/v1/status/${merchantId}/${merchantTransactionId}${saltKey}`;
    const hash = crypto.createHash('sha256').update(dataToHash).digest('hex');
    return `${hash}###${saltIndex}`;
  }

  /**
   * Generates checksum for callback response verification
   */
  static generateCallbackChecksum(base64Response: string, saltKey: string, saltIndex: number): string {
    const dataToHash = base64Response + saltKey;
    const hash = crypto.createHash('sha256').update(dataToHash).digest('hex');
    return `${hash}###${saltIndex}`;
  }

  /**
   * Verifies PhonePe callback signature
   */
  static verifyCallbackSignature(base64Response: string, xVerifyHeader: string, saltKey: string, saltIndex: number): boolean {
    const expectedHeader = this.generateCallbackChecksum(base64Response, saltKey, saltIndex);
    return expectedHeader === xVerifyHeader;
  }
}
