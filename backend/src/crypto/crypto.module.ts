import { Module } from '@nestjs/common';
import { AESService } from './aes.service';
import { RSAService } from './rsa.service';
import { RSAController } from './rsa.controller';

@Module({
  providers: [AESService, RSAService],
  exports: [AESService, RSAService],
  controllers: [RSAController],
})
export class CryptoModule {}
