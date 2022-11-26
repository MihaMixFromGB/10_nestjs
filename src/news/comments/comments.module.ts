import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CommentsStore } from './comments.store';
import { CommentsViewService } from './comments.view/comments.view.service';

@Module({
  providers: [CommentsService, CommentsStore, CommentsViewService],
  controllers: [CommentsController],
  exports: [CommentsService, CommentsStore, CommentsViewService],
})
export class CommentsModule {}
