import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from './auth/auth.service';
import { Auth } from './auth/dto/auth.dto';
import { LocalStrategy } from './auth/local.strategy';
import { UserEntity } from './user/entity/user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private authService: AuthService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  getUser(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  getAllUsers() {
    return this.userRepository.findBy;
  }
}
