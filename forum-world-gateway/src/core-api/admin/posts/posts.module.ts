import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { CoreApiModule } from 'src/core-api/_shared/core-api-module/core-api.module';

@Module({
  imports: [CoreApiModule.forFeature('/admin/posts')],
  providers: [PostsService],
  controllers: [PostsController]
})
export class PostsModule {}
