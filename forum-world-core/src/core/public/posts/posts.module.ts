import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { DatabaseModule } from 'src/database/database.module';
import { PostsRepository } from './repositories/posts.repository';

@Module({
  imports: [DatabaseModule],
  exports: [PostsService],
  providers: [PostsRepository, PostsService]
})
export class PostsModule {}
