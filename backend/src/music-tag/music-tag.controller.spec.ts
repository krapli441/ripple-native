import { Test, TestingModule } from '@nestjs/testing';
import { MusicTagController } from './music-tag.controller';

describe('MusicTagController', () => {
  let controller: MusicTagController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MusicTagController],
    }).compile();

    controller = module.get<MusicTagController>(MusicTagController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
