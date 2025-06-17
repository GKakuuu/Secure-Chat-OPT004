import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AESService } from '../crypto/aes.service';
import { RSAService } from '../crypto/rsa.service';
import { SendMessageDto } from '../messages/dto/send-message.dto';

interface StoredMessage {
  from: string;
  encryptedMessage: string;
  encryptedAESKey: string;
  iv: string;
  timestamp: number;
}

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);
  private readonly peerUrl = process.env.PEER_URL!;
  private readonly inbox = new Map<string, StoredMessage[]>();

  constructor(
    private readonly aesService: AESService,
    private readonly rsaService: RSAService,
    private readonly httpService: HttpService,
  ) {}

  async sendMessage(dto: SendMessageDto) {
    const aesKey = this.aesService.generateKey();
    const { iv, encryptedData } = this.aesService.encrypt(dto.message, aesKey);
    const peerPublicKey = await this.fetchPublicKeyFromPeer(dto.to);
    const encryptedAESKey = this.rsaService.encryptAESKeyWithPublicKey(aesKey, peerPublicKey);

    const dataToSend = {
      from: process.env.USER_ID,
      encryptedMessage: encryptedData,
      encryptedAESKey,
      iv,
    };

    this.logger.log(`Payload cifrado enviado a ${dto.to}:`);
    console.log(JSON.stringify(dataToSend, null, 2));

    await firstValueFrom(
      this.httpService.post(`${this.peerUrl}`, dataToSend),
    );

    return dataToSend;
  }

  receiveMessage(
    encryptedMessage: string,
    encryptedAESKey: string,
    iv: string,
    from: string,
    to: string,
  ) {
    const message: StoredMessage = {
      from,
      encryptedMessage,
      encryptedAESKey,
      iv,
      timestamp: Date.now(),
    };

    if (!this.inbox.has(to)) {
      this.inbox.set(to, []);
    }

    this.inbox.get(to)?.push(message);
    return { status: 'stored', receivedFrom: from };
  }

  getMessages(userId: string): { decrypted: string; from: string; timestamp: number }[] {
    const userInbox = this.inbox.get(userId) || [];
    const privateKey = this.rsaService.getPrivateKey(userId);

    return userInbox.map(msg => {
      const aesKey = this.rsaService.decryptAESKeyWithPrivateKey(
        msg.encryptedAESKey,
        privateKey,
      );
      const decrypted = this.aesService.decrypt(
        msg.encryptedMessage,
        aesKey,
        msg.iv,
      );
      return {
        from: msg.from,
        decrypted,
        timestamp: msg.timestamp,
      };
    });
  }

  // 🔐 Nuevo método para obtener la clave pública desde el peer por HTTP
  private async fetchPublicKeyFromPeer(userId: string): Promise<string> {
    const peerBaseUrl = this.peerUrl.replace('/chat/receive', '');
    const url = `${peerBaseUrl}/keys/public/${userId}`;

    try {
      const response = await firstValueFrom(this.httpService.get<{ publicKey: string }>(url));
      return response.data.publicKey;
    } catch (err) {
      this.logger.error(`No se pudo obtener la clave pública de ${userId}`, err);
      throw new Error('Error al obtener clave pública del peer');
    }
  }
}
