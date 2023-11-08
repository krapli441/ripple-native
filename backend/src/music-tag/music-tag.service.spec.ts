import { Test, TestingModule } from '@nestjs/testing';
import { MusicTagService } from './music-tag.service';

describe('MusicTagService', () => {
  let service: MusicTagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MusicTagService],
    }).compile();

    service = module.get<MusicTagService>(MusicTagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
