import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { DatabaseModule } from 'src/database/database.module';
import { PostsRepository } from './repositories/posts.repository';
import { ContentsModule } from '../_share/contents/contents.module';

@Module({
  imports: [DatabaseModule, ContentsModule],
  controllers: [PostsController],
  providers: [PostsService, PostsRepository],
})
export class PostsModule {}
