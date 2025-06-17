import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { SendMessageDto } from '../messages/dto/send-message.dto';
import { ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('Chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('send')
  @ApiBody({ type: SendMessageDto })
  async sendMessage(@Body() dto: SendMessageDto) {
    return this.chatService.sendMessage(dto);
  }

  @Post('receive')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        from: { type: 'string' },
        encryptedMessage: { type: 'string' },
        encryptedAESKey: { type: 'string' },
        iv: { type: 'string' },
      },
      required: ['from', 'encryptedMessage', 'encryptedAESKey', 'iv'],
    },
  })
  receiveMessage(
    @Body('from') from: string,
    @Body('encryptedMessage') encryptedMessage: string,
    @Body('encryptedAESKey') encryptedAESKey: string,
    @Body('iv') iv: string,
  ) {
    const to = process.env.USER_ID!;
    return this.chatService.receiveMessage(
      encryptedMessage,
      encryptedAESKey,
      iv,
      from,
      to,
    );
  }

  @Get('messages')
  getMessages() {
    const userId = process.env.USER_ID!;
    return this.chatService.getMessages(userId);
  }
}
