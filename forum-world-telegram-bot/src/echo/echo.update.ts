import { UseInterceptors, UseFilters } from '@nestjs/common';
import { Context } from 'telegraf';
import { Update, Start, Ctx, On, Message } from 'nestjs-telegraf';

import { TelegrafExceptionFilter } from 'src/common/filters/telegraf-exception.filter';
import { ResponseTimeInterceptor } from 'src/common/interceptors/response-time.interceptor';
import { EchoService } from './echo.service';
import { ReverseTextPipe } from 'src/common/pipes/reverse-text.pipe';

@Update()
@UseInterceptors(ResponseTimeInterceptor)
@UseFilters(TelegrafExceptionFilter)
export class EchoUpdate {

    constructor(
        private readonly echoService: EchoService
    ) {}

    @Start()
    async onStart(@Ctx() ctx: Context): Promise<string> {
        const me = await ctx.telegram.getMe();
        return `Hey, I'm ${me.first_name}`;
    }

    @On('text')
    onMessage(@Message('text', new ReverseTextPipe()) reversedText: string): string {
        return this.echoService.echo(reversedText);
    }

}