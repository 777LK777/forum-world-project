
import { ConfigService } from '@nestjs/config';
import { CoreApiService, CoreApiServiceFactory } from 'src/core-api/_shared/core-api-module/core-api.service';
import { HttpService } from '@nestjs/axios';

export default () => ({
    apiServiceFactory: {
        provide: CoreApiService,
        useFactory: (config: ConfigService, http: HttpService, pathFragment: string) => {
          const factory = new CoreApiServiceFactory();
          return factory.create(config, http, pathFragment);
        },
        inject: [ConfigService, HttpService, 'PATH_FRAGMENT_TOKEN']
    },
    pathFragmentToken: (pathFragment: string) => ({
        provide: 'PATH_FRAGMENT_TOKEN',
        useValue: `${pathFragment}`
    })
})