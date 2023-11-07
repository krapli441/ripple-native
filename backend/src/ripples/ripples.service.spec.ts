import { Test, TestingModule } from '@nestjs/testing';
import { RipplesService } from './ripples.service';

describe('RipplesService', () => {
  let service: RipplesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RipplesService],
    }).compile();

    service = module.get<RipplesService>(RipplesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
