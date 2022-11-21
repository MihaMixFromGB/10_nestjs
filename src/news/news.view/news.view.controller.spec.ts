import { Test, TestingModule } from '@nestjs/testing';
import { NewsVmController } from './news.view.controller';

describe('NewsVmController', () => {
  let controller: NewsVmController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewsVmController],
    }).compile();

    controller = module.get<NewsVmController>(NewsVmController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
