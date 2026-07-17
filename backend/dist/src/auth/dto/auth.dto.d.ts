export declare class SignupDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}
export declare class LoginDto {
    email: string;
    password: string;
}
export declare class VerifyOtpDto {
    email: string;
    otp: string;
}
export declare class ResendOtpDto {
    email: string;
}
export declare class ForgotPasswordDto {
    email: string;
}
export declare class ResetPasswordDto {
    email: string;
    otp: string;
    password: string;
}
