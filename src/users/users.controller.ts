import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDTO } from './dto/create-users.dto';
import { UpdateUsersDTO } from './dto/updata-users.dto';
import { CheckIdDTO } from './dto/checkId-users.dto';
import { AuthGuard } from './guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { LoginUserDTO } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('registrar')
  @UseInterceptors(
    FileInterceptor('img', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const fileExtension = path.extname(file.originalname);
          const filename = `${Date.now()}${fileExtension}`; 
          callback(null, filename);
        },
      }),
    }),
  )
  async createUser(
    @Body() createUserDto: CreateUsersDTO,
    @UploadedFile() file: any,
  ) {
    return this.usersService.createUser(createUserDto, file);
  }

  @Post('login')
  async login(@Body() loginUserDTO: LoginUserDTO) {
    return this.usersService.login(loginUserDTO);
  }

  @Get()
  @UseGuards(AuthGuard)
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getUserById(@Param() checkIdDTO: CheckIdDTO) {
    return this.usersService.getUserById(checkIdDTO.id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('img', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const fileExtension = path.extname(file.originalname);
          const filename = `${Date.now()}${fileExtension}`; 
          callback(null, filename);
        },
      }),
    }),
  )
  async updateUser(
    @Param('id') id: string,
    @Body() updateData: UpdateUsersDTO,
      @UploadedFile() file?: any,
  ) {
    return this.usersService.updateUser(id, {...updateData,img:file?.path});
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteUser(@Param() checkIdDTO: CheckIdDTO) {
    return this.usersService.deleteUser(checkIdDTO.id);
  }
}
