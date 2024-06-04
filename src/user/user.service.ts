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
    const userData = await this.userRepository.findOneBy({ email });
    if (!userData) throw new NotFoundException({ message: 'user not found' });
    const { password: correctPassword, ...user } = userData;
    const valid = bcrypt.compareSync(password, correctPassword);
    console.log(valid);
    if (!valid)
      throw new UnauthorizedException({ message: 'invalid password' });
    return user;
  }

  async createUser(user: CreateUserDto) {
    const saltRounds = 10;
    user.password = bcrypt.hashSync(user.password, saltRounds);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...clearUser } = await this.userRepository.save(user);
    return clearUser;
  }

  async getUserData(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException({ message: 'user not found' });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...clearUser } = user;
    return clearUser;
  }
}
