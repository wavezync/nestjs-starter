/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { UserNotFoundException } from '../../exceptions/user-not-found.exception';
import * as bcrypt from 'bcrypt';
import { LoginResponseDto } from './dto/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userServie: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async loginUser(loginDto: LoginDto): Promise<LoginResponseDto> {
    const { login, password } = loginDto;
    const user = await this.userServie.findUserByEmail(login);
    if (!user) {
      throw new UserNotFoundException();
    }

    const passwordOk = await bcrypt.compare(password, user.passwordHash);
    if (!passwordOk) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const accessToken = await this.jwtService.signAsync(
      { userId: user.id },
      { issuer: 'api', subject: user.id, expiresIn: '1h' },
    );

    const response: LoginResponseDto = {
      accessToken,
      user: user.toDto(),
    };

    return response;
  }

  async authenticateWithJwt(token: string) {
    return 'ok';
  }
}
