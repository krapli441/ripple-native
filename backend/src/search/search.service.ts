import { Injectable } from '@nestjs/common';

@Injectable()
export class SearchService {
  // ...기존 코드

  public async searchMusicForUser(userId: string, query: string): Promise<any> {
    // ...메서드 구현
  }
}
