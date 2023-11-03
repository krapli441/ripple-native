import { Test, TestingModule } from '@nestjs/testing';
import { SpotifyStrategy } from './spotify-strategy.service';

describe('SpotifyStrategy', () => {
  let service: SpotifyStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpotifyStrategy],
    }).compile();

    service = module.get<SpotifyStrategy>(SpotifyStrategy);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
