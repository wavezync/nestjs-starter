/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Public, User } from 'src/decorators';
import { UserDto } from '../user/dto/user.dto';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import { CurrentUser } from './dto/current-user.dto';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    description: 'Login the user to the system',
    summary: 'Login to the system',
  })
  @ApiUnauthorizedResponse({ description: 'Invalid login details' })
  login(@Body() loginDto: LoginDto): Promise<LoginResponseDto | undefined> {
    return this.authService.loginUser(loginDto);
  }

  @Get('/me')
  @ApiBearerAuth()
  async me(@User() user: UserDto): Promise<CurrentUser> {
    return { user };
  }
}
