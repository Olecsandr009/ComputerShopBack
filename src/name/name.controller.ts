import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { NameDTO } from './name.dto';
import { NameService } from './name.service';

@Controller('name')
export class NameController {
  constructor(private nameService: NameService) {}

  @Post('create-name')
  async createName(@Body() data: NameDTO) {
    return this.nameService.createName(data);
  }

  @Get('delete-name')
  async deleteName(@Body() data: number) {
    return this.nameService.deleteCategory(data);
  }

  @Get('get-names')
  async getNames() {
    return this.nameService.find();
  }

  @Get('get-names-child')
  async getNamesChild() {
    return this.nameService.findChildren();
  }

  @Get('/:name')
  async getNameChildByName(@Param('name') name: string) {
    return this.nameService.findChildrenByName(name);
  }
}
