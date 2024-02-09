import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/category/category.entity';
import { NameEntity } from 'src/name/name.entity';
import { SubCategoryController } from './sub-category.controller';
import { SubCategoryEntity } from './sub-category.entity';
import { SubCategoryService } from './sub-category.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryEntity, SubCategoryEntity, NameEntity]),
  ],
  controllers: [SubCategoryController],
  providers: [SubCategoryService],
  exports: [SubCategoryService],
})
export class SubCategoryModule {}
