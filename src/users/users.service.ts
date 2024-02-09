import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUser } from 'src/auth/dto/updateUser.dto';
import { UserEntity } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';

export type User = {
  _id: number;
  email: string;
  password: string;
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    return await this.userRepository.findOneBy({ email });
  }

  async findOneBy(_id: number) {
    const user = await this.userRepository.findOneBy({ _id });

    if (!user) {
      return;
    }

    return user;
  }

  async update(user: UpdateUser) {
    const id = user._id;
    const getUser = await this.findOneBy(id);

    if (!getUser) return;

    return this.userRepository.save({ id, ...user });
  }

  async getUser() {
    return await this.userRepository.find();
  }

  async deleteUser(_id: number) {
    return await this.userRepository.delete({ _id });
  }
}
