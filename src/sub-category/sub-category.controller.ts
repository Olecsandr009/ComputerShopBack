import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SubCategoryDTO } from './sub-category.dto';
import { SubCategoryService } from './sub-category.service';

@Controller('sub-category')
export class SubCategoryController {
  constructor(private subCategoryService: SubCategoryService) {}

  @Post('create-sub-category')
  async createSubCategory(@Body() data: SubCategoryDTO) {
    return this.subCategoryService.createSubCategory(data);
  }

  @Get('delete-sub-category')
  async deleteSubCategory(@Body() _id: number) {
    return this.subCategoryService.deleteSubCategory(_id);
  }

  @Get('get-sub-categories')
  async getSubCategories() {
    return this.subCategoryService.find();
  }

  @Get('get-sub-categories-child')
  async getSubCategoriesChild() {
    return this.subCategoryService.findChildren();
  }

  @Get('get-sub-categories/:count')
  async getSubCategoriesCount(@Param('count') count: number) {
    return this.subCategoryService.findSubCategoryByCount(count);
  }

  @Get('search/:searchTerm')
  async searchProduct(@Param('searchTerm') searchTerm: string) {
    return this.subCategoryService.searchMany(searchTerm);
  }

  @Get('/:categoryName')
  async getCategoryChildByName(@Param('categoryName') name: string) {
    return this.subCategoryService.findChildrenByName(name);
  }
}
