import { Test, TestingModule } from '@nestjs/testing';
import { SpotifyStrategyService } from './spotify-strategy.service';

describe('SpotifyStrategyService', () => {
  let service: SpotifyStrategyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpotifyStrategyService],
    }).compile();

    service = module.get<SpotifyStrategyService>(SpotifyStrategyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
