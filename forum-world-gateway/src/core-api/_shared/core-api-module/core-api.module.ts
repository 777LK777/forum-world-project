import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

import { CoreApiService } from './core-api.service';
import api from '../../../config/api-endpoints'
import apiServiceConfig from '../../_shared/core-api-module/core-api-service.config';

@Module({
    imports: [
        HttpModule,
        ConfigModule.forFeature(api)],
    exports: [CoreApiService]
})
export class CoreApiModule {
    static forFeature(pathFragment: string): DynamicModule {
        return {
            module: CoreApiModule,
            providers: [
                CoreApiService,
                apiServiceConfig().apiServiceFactory,
                apiServiceConfig().pathFragmentToken(pathFragment)
            ],
            exports: [CoreApiService]
        }
    }
}
