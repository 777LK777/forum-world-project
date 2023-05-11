import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { PublicModule } from './public/public.module';

@Module({
  imports: [
    UsersModule,
    AdminModule,
    PublicModule
  ],
})
export class CoreModule {}
