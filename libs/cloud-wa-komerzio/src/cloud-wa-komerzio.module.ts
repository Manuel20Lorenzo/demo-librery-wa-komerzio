/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CloudWaKomerzioService } from './cloud-wa-komerzio.service';
import { HttpModule } from '@nestjs/axios'
@Module({
  imports:[HttpModule.register({
    timeout: 5000,
    maxRedirects: 5,
  })],
  providers: [CloudWaKomerzioService],
  exports: [CloudWaKomerzioService],
})
export class CloudWaKomerzioModule {}
