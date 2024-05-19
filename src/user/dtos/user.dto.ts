import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { RoleEnum } from '../enums/role.enum';

export class ValidateUserDto {
  @IsEmail()
  username: string;

  @IsString()
  password: string;
}

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsEnum(RoleEnum)
  role: RoleEnum;
}
