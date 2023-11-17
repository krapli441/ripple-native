export declare class CreateUserDto {
    username: string;
    email: string;
    accessToken: string;
    refreshToken: string;
    tokenExpiry: Date;
    pushToken?: string;
}
