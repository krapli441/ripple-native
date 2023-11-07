import { Test, TestingModule } from '@nestjs/testing';
import { RipplesController } from './ripples.controller';

describe('RipplesController', () => {
  let controller: RipplesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RipplesController],
    }).compile();

    controller = module.get<RipplesController>(RipplesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
