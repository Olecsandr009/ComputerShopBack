import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { CreateUser } from './auth/dto/createUser.dto';
import { UpdateUser } from './auth/dto/updateUser.dto';
import { User } from './auth/dto/user.dto';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
//import { CategoryService } from './category/category.service';
import { EnumProductFlags, EnumProductStatus } from './product/product.entity';

class IdDTO {
  _id: number;
}

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private appService: AppService,
  ) {}

  /* <=--------------------------- AUTH ----------------------------=> */
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('auth/register')
  async register(@Body() createUser: CreateUser) {
    this.authService.register(
      createUser.email,
      createUser.name,
      createUser.firstname,
      createUser.password,
    );
  }

  @Post('auth/update')
  async update(@Body() updateData: UpdateUser) {
    this.authService.update(updateData);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('getUser')
  async getUser(@Body() user: User) {
    return this.appService.getUser(user.email);
  }

  @Get('getUsers')
  async findAll() {
    return this.authService.getUser();
  }

  @Get('deleteUser')
  async deleteUser(@Body() _id: IdDTO) {
    return this.authService.deleteUser(_id._id);
  }

  /* <=-------------------------CREATE PRODUCT------------------------------=> */

  /* <=---------------------------CREATE IMAGE----------------------------=> */

  @Post('create-image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const name = file.originalname.split('.')[0];
          const splitLength = file.originalname.split('.').length;
          const fileExtension = file.originalname.split('.')[splitLength - 1];
          const newFileName =
            name.split('').join('_') + '_' + Date.now() + '.' + fileExtension;

          cb(null, newFileName);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return cb(null, false);
        }
        cb(null, true);
      },
    }),
  )
  async createImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is not an image');
    } else {
      const response = {
        filePath: `http://localhost:3000/pictures/${file.filename}`,
      };
      return response;
    }
  }

  @Get('pictures/:filename')
  async getImages(@Param('filename') filename, @Res() res: Response) {
    res.sendFile(filename, { root: './uploads' });
  }

  /* <=---------------------------ENUM STATUS----------------------------=> */

  @Get('get-enum-product-status')
  async getEnumProductStatus() {
    return EnumProductStatus;
  }

  /* <=----------------------------ENUM FLAGS---------------------------=> */

  @Get('get-enum-product-flags')
  async getEnumProductFlags() {
    return EnumProductFlags;
  }
}
