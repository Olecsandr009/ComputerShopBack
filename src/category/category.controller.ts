import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CategoryDTO } from './category.dto';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post('create-category')
  async createCategory(@Body() data: CategoryDTO) {
    return this.categoryService.createCategory(data);
  }

  @Get('delete-category')
  async deleteCategory(@Body() id: number) {
    return this.categoryService.deleteCategory(id);
  }

  @Get('get-categories')
  async geCategories() {
    return this.categoryService.find();
  }

  @Get('get-child-categories')
  async getChildSubCategories() {
    return this.categoryService.findChildren();
  }

  @Get('search/:searchTerm')
  async searchProduct(@Param('searchTerm') searchTerm: string) {
    return this.categoryService.searchMany(searchTerm);
  }

  @Get('/:categoryName')
  async getCategoryChildByName(@Param('categoryName') name: string) {
    return this.categoryService.findChildrenByName(name);
  }
}
