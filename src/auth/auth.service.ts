import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/entity/user.entity';
import { UsersService } from '../users/users.service';
import { DataSource } from 'typeorm';
import { UpdateUser } from './dto/updateUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private dataSource: DataSource,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      sub: user._id,
      firstname: user.firstname,
      name: user.name,
      sex: user.sex,
      birthday: user.birthday,
      phone: user.phone,
      ava: user.ava,
      live: user.live,
      category: user.category,
      status: user.status,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(
    email: string,
    name: string,
    firstname: string,
    password: string,
  ): Promise<void> {
    const oldUser = await this.usersService.findOne(email);

    if (oldUser) {
      throw new BadRequestException('User is already');
    }

    const user = new UserEntity();

    user.email = email;
    user.name = name;
    user.firstname = firstname;
    user.password = password;

    await this.dataSource.transaction(
      async (manager) => await manager.save(user),
    );
  }

  async update(user: UpdateUser) {
    this.usersService.update(user);
  }

  async getUser() {
    return this.usersService.getUser();
  }

  async deleteUser(id: number) {
    return this.usersService.deleteUser(id);
  }
}
