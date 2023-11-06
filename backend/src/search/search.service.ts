import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SearchService {
  constructor(
    private userService: UserService,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async searchMusicForUser(userId: string, query: string) {
    let user = await this.userService.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // AccessToken 유효성 검사
    if (new Date() > new Date(user.tokenExpiry)) {
      // AccessToken이 만료된 경우 갱신
      user = await this.refreshAccessToken(user);
    }

    try {
      const response = await this.httpService
        .get(`https://api.spotify.com/v1/search`, {
          headers: { Authorization: `Bearer ${user.accessToken}` },
          params: { q: query, type: 'track' },
        })
        .toPromise();

      return response.data.tracks.items;
    } catch (error) {
      console.error('Error searching Spotify:', error);
      throw new Error('Error searching Spotify');
    }
  }

  private async refreshAccessToken(user) {
    const refreshToken = user.refreshToken;
    const clientId = this.configService.get('SPOTIFY_CLIENT_ID');
    const clientSecret = this.configService.get('SPOTIFY_CLIENT_SECRET');

    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refreshToken);
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);

    try {
      const response = await this.httpService
        .post('https://accounts.spotify.com/api/token', params, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
        .toPromise();

      const data = response.data;
      const expiryDate = new Date(
        new Date().getTime() + data.expires_in * 1000,
      );

      // 갱신된 토큰과 만료 시간을 사용자 정보에 업데이트
      await this.userService.update(user._id, {
        accessToken: data.access_token,
        refreshToken: data.refresh_token || refreshToken, // Spotify는 갱신 시 새 refreshToken을 반환할 수 있다.
        tokenExpiry: expiryDate,
      });

      // 업데이트된 사용자 정보를 반환
      return this.userService.findById(user._id);
    } catch (error) {
      console.error('Error refreshing Spotify access token:', error);
      throw new Error('Could not refresh access token');
    }
  }
}
