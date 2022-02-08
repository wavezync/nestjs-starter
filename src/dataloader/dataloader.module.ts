import { DataloaderService } from './dataloader.service';
import { Module } from '@nestjs/common';
import { UserModule } from 'modules/user/user.module';

@Module({
  imports: [UserModule],
  providers: [DataloaderService],
  exports: [DataloaderService],
})
export class DataloaderModule {}
