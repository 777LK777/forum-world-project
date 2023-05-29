import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CoreApiModule } from 'src/core-api/_shared/core-api-module/core-api.module';

@Module({
  imports: [CoreApiModule.forFeature('/public/posts')],
  providers: [PostsService],
  exports: [PostsService]
})
export class PostsModule {}
