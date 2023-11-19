import { Controller, Get, Header, Query, Res, StreamableFile } from '@nestjs/common';
import { AppService } from './app.service';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('generate-poster')
  @Header('Content-Type', 'image/png')
  async getHello(@Query('scale') scale: number) {
    await this.appService.getHello(scale)
    const file = createReadStream(join(process.cwd(), 'example.png'));
    return new StreamableFile(file);
  }
}
