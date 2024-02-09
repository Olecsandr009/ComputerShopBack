import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandEntity } from 'src/brand/brand.entity';
import { CategoryEntity } from 'src/category/category.entity';
import { NameEntity } from 'src/name/name.entity';
import { ProductEntity } from 'src/product/product.entity';
import { SubCategoryEntity } from 'src/sub-category/sub-category.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      BrandEntity,
      CategoryEntity,
      SubCategoryEntity,
      NameEntity,
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [TypeOrmModule],
})
export class ProductModule {}
