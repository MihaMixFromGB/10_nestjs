import { Test, TestingModule } from '@nestjs/testing';
import { UsersViewController } from './users.view.controller';

describe('UsersViewController', () => {
  let controller: UsersViewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersViewController],
    }).compile();

    controller = module.get<UsersViewController>(UsersViewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
