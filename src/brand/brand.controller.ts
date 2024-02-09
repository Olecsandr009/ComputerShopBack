import { Body, Controller, Get, Post } from '@nestjs/common';
import { BrandDTO } from './brand.dto';
import { BrandService } from './brand.service';

@Controller('brand')
export class BrandController {
  constructor(private brandService: BrandService) {}

  @Post('create-brand')
  async createBrand(@Body() data: BrandDTO) {
    return this.brandService.createBrand(data);
  }

  @Get('delete-brand')
  async deleteBrand(@Body() _id: number) {
    return this.brandService.deleteBrand(_id);
  }

  @Get('get-brands')
  async getBrand() {
    return this.brandService.find();
  }
}
