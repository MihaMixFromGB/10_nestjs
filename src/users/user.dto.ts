import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { IUser } from './user.interface';

export class UserDto implements Omit<IUser, 'id' | 'createdAt' | 'updatedAt'> {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  role: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  avatar: string;
}
