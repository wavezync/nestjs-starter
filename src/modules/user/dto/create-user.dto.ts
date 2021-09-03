import { ApiProperty } from '@nestjs/swagger';

/**
 * Creates a new user
 */
export class CreateUserDto {
  @ApiProperty({
    description: 'Email of user',
    example: 'jhondoe@example.com',
  })
  email!: string;

  @ApiProperty({
    description: 'Password for user',
    example: 'abc@123',
  })
  password!: string;
}
