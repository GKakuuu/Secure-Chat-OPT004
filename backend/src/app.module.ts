import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { CryptoModule } from './crypto/crypto.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ChatModule, CryptoModule],
})
export class AppModule {}
