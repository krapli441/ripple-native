import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    validateSpotifyToken(accessToken: string): Promise<boolean>;
    createJwt(user: any): string;
    createRefreshToken(): string;
}
