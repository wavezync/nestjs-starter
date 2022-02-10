import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dtos/login.dto';
import bcrypt from 'bcrypt';
import { LoginResponseDto } from './dtos/login-response.dto';
import { InvalidLoginOrPasswordException } from './exceptions/invalid-login-or-password.exception';

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
      throw new InvalidLoginOrPasswordException();
    }

    const passwordOk = await bcrypt.compare(password, user.passwordHash);
    if (!passwordOk) {
      throw new InvalidLoginOrPasswordException();
    }

    const jwtPayload = { id: user.id };

    const accessToken = await this.jwtService.signAsync(jwtPayload, {
      issuer: 'api',
      subject: user.id,
      expiresIn: '1h',
    });

    const response: LoginResponseDto = {
      accessToken,
      user: user.toDto(),
    };

    return response;
  }

  async authenticateWithJwt(token: string) {
    const decodedJwt = await this.jwtService.verifyAsync(token);
    if (!decodedJwt) {
      throw new UnauthorizedException();
    }

    const id: string = decodedJwt['id'];
    const user = await this.userServie.findUserById(id);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user.toDto();
  }
}
