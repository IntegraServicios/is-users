import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/user.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async validateUser(email: string, password: string) {
    const { password: correctPassword, ...user } =
      await this.userRepository.findOneBy({ email });
    if (!user) throw new NotFoundException({ message: 'user not found' });
    const valid = bcrypt.compareSync(password, correctPassword);
    console.log(valid);
    if (!valid)
      throw new UnauthorizedException({ message: 'invalid password' });
    return user;
  }

  async createUser(user: CreateUserDto) {
    const saltRounds = 10;
    user.password = bcrypt.hashSync(user.password, saltRounds);
    const { password, ...cleanUser } = await this.userRepository.save(user);
    return cleanUser;
  }
}
