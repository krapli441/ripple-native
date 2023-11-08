import { Test, TestingModule } from '@nestjs/testing';
import { TagService } from './music-tag.service';

describe('MusicTagService', () => {
  let service: TagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TagService],
    }).compile();

    service = module.get<TagService>(TagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
