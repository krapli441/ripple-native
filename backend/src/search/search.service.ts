import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class SearchService {
  constructor(
    private userService: UserService,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  public async searchMusicForUser(userId: string, query: string): Promise<any> {
    let user = await this.userService.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Check if the accessToken is still valid
    if (new Date() > new Date(user.tokenExpiry)) {
      user = await this.refreshAccessToken(user);
    }

    const response = await this.httpService
      .get(`https://api.spotify.com/v1/search`, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
        params: { q: query, type: 'track' },
      })
      .toPromise();

    return response.data.tracks.items;
  }

  private async refreshAccessToken(user: any): Promise<any> {
    const refreshToken = user.refreshToken;
    const clientId = this.configService.get('SPOTIFY_CLIENT_ID');
    const clientSecret = this.configService.get('SPOTIFY_CLIENT_SECRET');

    // Construct the refresh token request
    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refreshToken);
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);

    // Make the request to Spotify to refresh the accessToken
    const response = await this.httpService
      .post('https://accounts.spotify.com/api/token', params.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
      .toPromise();

    const data = response.data;
    const newExpiryDate = new Date(
      new Date().getTime() + data.expires_in * 1000,
    );

    // Update the user with the new accessToken and expiryDate
    await this.userService.update(user.id, {
      accessToken: data.access_token,
      refreshToken: data.refresh_token || refreshToken,
      tokenExpiry: newExpiryDate,
    });

    // Return the updated user
    return this.userService.findByUsername(user.id);
  }
}
