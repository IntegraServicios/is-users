import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { CreateUserDto, ValidateUserDto } from './dtos/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('validate')
  validateUser(@Body() { username, password }: ValidateUserDto) {
    return this.userService.validateUser(username, password);
  }

  @Put()
  createUser(@Body() data: CreateUserDto) {
    return this.userService.createUser(data);
  }

  @Get(':id')
  getUserData(id: number) {
    return this.userService.getUserData(id);
  }
}
