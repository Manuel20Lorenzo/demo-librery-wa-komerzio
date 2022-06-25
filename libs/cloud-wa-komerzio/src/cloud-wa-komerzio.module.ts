/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CloudWaKomerzioService } from './cloud-wa-komerzio.service';
import { HttpModule } from '@nestjs/axios'
import { templateServiceWA } from "./service/templateMsg.service";
import { sendMessage } from "./service/sendMessage.service";
@Module({
  imports:[HttpModule.register({
    timeout: 5000,
    maxRedirects: 5,
  })],
  providers: [CloudWaKomerzioService,templateServiceWA, sendMessage],
  exports: [CloudWaKomerzioService],
})
export class CloudWaKomerzioModule {}
