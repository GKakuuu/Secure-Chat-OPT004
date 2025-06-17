import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { RSAService } from './rsa.service';

@Controller('keys')
export class RSAController {
  constructor(private readonly rsaService: RSAService) {}

  @Get('public/:userId')
  getPublicKey(@Param('userId') userId: string) {
    try {
      const key = this.rsaService.getPublicKey(userId);
      return { publicKey: key };
    } catch {
      throw new NotFoundException(`Clave pública no encontrada para ${userId}`);
    }
  }
}
