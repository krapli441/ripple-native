import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import fetch from 'node-fetch';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateSpotifyToken(accessToken: string): Promise<boolean> {
    try {
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        return await response.json();
      }

      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  createJwt(user: any): string {
    // 'user'는 Spotify에서 반환받은 사용자 정보이다. 필요한 정보를 선택적으로 포함시킬 수 있다.
    const payload = { username: user.id, sub: user.email };
    return this.jwtService.sign(payload);
  }

  // Refresh Token을 생성하는 로직. 실제 구현은 복잡기 때문에 간략하게 처리했다.
  createRefreshToken(): string {
    return 'SOME_REFRESH_TOKEN';
  }
}
