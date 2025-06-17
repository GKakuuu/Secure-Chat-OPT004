import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { SendMessageDto } from '../messages/dto/send-message.dto';
import { ReceiveMessageDto } from '../messages/dto/receive-message.dto';
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
  @ApiBody({ type: ReceiveMessageDto })
  receiveMessage(@Body() dto: ReceiveMessageDto) {
    const to = process.env.USER_ID;
    return this.chatService.receiveMessage(
      dto.encryptedMessage,
      dto.encryptedAESKey,
      dto.iv,
      dto.from,
      to,
    );
  }

  @Get('messages')
  getMessages() {
    const userId = process.env.USER_ID;
    return this.chatService.getMessages(userId);
  }
}
