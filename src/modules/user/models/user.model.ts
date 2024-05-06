import { User } from 'database/schema/users';
import { UserDto } from '../dtos/user.dto';

export class UserModel implements User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.passwordHash = user.passwordHash;
    this.verified = user.verified;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }

  // any calculated properties goes here
  get joined_years_ago() {
    return new Date().getFullYear() - this.createdAt.getFullYear();
  }

  toDto(): UserDto {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      verified: this.verified,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
