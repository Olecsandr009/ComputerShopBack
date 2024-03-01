import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Id } from 'src/auth/dto/id.dto';
import { createProductDTO } from './dto/create-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('createProduct')
  async createProduct(@Body() data: createProductDTO) {
    console.log(data, 'test');
    return this.productService.createProduct(data);
  }

  @Get('getProduct')
  async getProduct(@Body() data: Id) {
    return this.productService.findOneById(data.id);
  }

  @Get('deleteProduct')
  async deleteProduct(@Body() data: number) {
    return this.productService.deleteProduct(data);
  }

  @Get('getAllProducts')
  async getAllProducts() {
    return this.productService.find();
  }

  @Get('search/:searchTerm')
  async searchProduct(@Param('searchTerm') searchTerm: string) {
    return this.productService.searchProducts(searchTerm);
  }

  @Get('/:slug')
  async getProductBySlug(@Param('slug') slug: string) {
    return this.productService.findOneBySlug(slug);
  }
}
