import { Test, TestingModule } from '@nestjs/testing';
import { CommentsViewService } from './comments.view.service';

describe('CommentsViewService', () => {
  let service: CommentsViewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentsViewService],
    }).compile();

    service = module.get<CommentsViewService>(CommentsViewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
