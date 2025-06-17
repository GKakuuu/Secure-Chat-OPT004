// src/crypto/crypto.module.ts
import { Module } from '@nestjs/common';
import { AESService } from './aes.service';
import { RSAService } from './rsa.service';
import { RSAController } from './rsa.controller';

@Module({
  providers: [AESService, RSAService],
  exports: [AESService, RSAService], // 👈 Exportamos los servicios
  controllers: [RSAController], // 👈 Agregado
})
export class CryptoModule {}
