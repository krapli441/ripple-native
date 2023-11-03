import { Test, TestingModule } from '@nestjs/testing';
import { SpotifyAuthController } from './auth.controller';

describe('AuthController', () => {
  let controller: SpotifyAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpotifyAuthController],
    }).compile();

    controller = module.get<SpotifyAuthController>(SpotifyAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
