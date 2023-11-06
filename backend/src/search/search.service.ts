import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { UserService } from '../user/user.service';

@Injectable()
export class SearchService {
  constructor(
    private userService: UserService,
    private httpService: HttpService,
  ) {}

  async searchMusicForUser(userId: string, query: string) {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // AccessToken 유효성 검사 및 갱신 로직 (생략)

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
}
