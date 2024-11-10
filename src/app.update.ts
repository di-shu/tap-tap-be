import { AppService } from './app.service';
import { InjectBot, Start, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';

@Update()
export class AppUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly appService: AppService,
  ) {}

  @Start()
  async start(ctx: Context): Promise<void> {
    const user = await ctx.telegram.getMyName();
    await ctx.reply(
      JSON.stringify(user, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value,
      ),
    );
  }
}
