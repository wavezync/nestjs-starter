/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { MessageDto } from '../../common/dto/message.dto';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from '../../common/decorators';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
  @Public()
  @ApiConflictResponse({
    description: 'Email already taken',
  })
  @ApiCreatedResponse({
    type: MessageDto,
    description: 'User account created',
  })
  @ApiOperation({
    description: 'Registers a new user account and sends a confirmation',
    summary: 'Register a new user',
  })
  async register(@Body() createUserDto: CreateUserDto): Promise<MessageDto> {
    await this.userService.register(createUserDto);

    return { message: 'Account created' };
  }
}
