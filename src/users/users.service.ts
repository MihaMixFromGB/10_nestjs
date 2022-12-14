import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { UserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findById(id: number): Promise<User> {
    return await this.usersRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOneBy({ email });
  }

  async create(userDto: UserDto): Promise<User> {
    let newUser = new User();
    newUser = {
      ...newUser,
      ...userDto,
    };

    return await this.usersRepository.save(newUser);
  }

  async update(id: number, userDto: Partial<UserDto>): Promise<User> {
    let updatedUser = new User();
    updatedUser = {
      ...updatedUser,
      ...userDto,
      id,
    };

    return await this.usersRepository.save(updatedUser);
  }

  async remove(id: number): Promise<User> {
    const deletedUser = await this.findById(id);

    return await this.usersRepository.remove(deletedUser);
  }
}
