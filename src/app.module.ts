import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CloudWaKomerzioModule } from '../libs/cloud-wa-komerzio/src/cloud-wa-komerzio.module';
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [CloudWaKomerzioModule,HttpModule.register({
    timeout: 5000,
    maxRedirects: 5,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
