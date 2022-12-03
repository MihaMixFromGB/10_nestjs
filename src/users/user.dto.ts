import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { IUser } from './user.interface';

export class UserDto implements Omit<IUser, 'id' | 'createdAt' | 'updatedAt'> {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  role: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  avatar: string;
}
