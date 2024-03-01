import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandEntity } from 'src/brand/brand.entity';
import { CategoryEntity } from 'src/category/category.entity';
import { NameEntity } from 'src/name/name.entity';
import {
  EnumProductFlags,
  EnumProductStatus,
  ProductEntity,
} from 'src/product/product.entity';
import { SubCategoryEntity } from 'src/sub-category/sub-category.entity';
import { DataSource, ILike, Repository } from 'typeorm';
import { createProductDTO } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(SubCategoryEntity)
    private subCategoryRepository: Repository<SubCategoryEntity>,
    @InjectRepository(BrandEntity)
    private brandRepository: Repository<BrandEntity>,
    @InjectRepository(NameEntity)
    private productNameRepository: Repository<NameEntity>,
    private dataSource: DataSource,
  ) {}

  async find() {
    return await this.productRepository.find();
  }

  async findOneById(_id: number): Promise<ProductEntity> {
    return await this.productRepository.findOne({ where: { _id } });
  }

  async findOneBySlug(slug: string): Promise<ProductEntity> {
    return await this.productRepository.findOne({ where: { slug } });
  }

  async searchProducts(searchTerm: string) {
    return await this.productRepository.find({
      where: [
        { model: ILike(`%${searchTerm}%`) },
        { description: ILike(`%${searchTerm}%`) },
      ],
    });
  }

  async createProduct(productData: createProductDTO) {
    const product = new ProductEntity();

    product.model = productData.model;
    product.image = productData.image;
    product.color = productData.color;
    product.status = EnumProductStatus[productData.status];
    product.characteristics = productData.characteristics;
    product.price = productData.price;
    product.discount = productData.discount;
    product.article = productData.article;
    product.guarantee = productData.guarantee;
    product.slug = productData.slug;
    product.flag = EnumProductFlags[productData.flag];

    const category = await this.categoryRepository.findOneBy({
      _id: productData.categoryId,
    });

    const subCategory = await this.subCategoryRepository.findOneBy({
      _id: productData.subCategoryId,
    });

    const brand = await this.brandRepository.findOneBy({
      _id: productData.brandId,
    });

    const productName = await this.productNameRepository.findOneBy({
      _id: productData.nameId,
    });

    product.category = category;
    product.subCategory = subCategory;
    product.brand = brand;
    product.nameProduct = productName;

    await this.dataSource.transaction(async (manager) => {
      await manager.getRepository(ProductEntity).insert(product);
    });
  }

  async deleteProduct(_id: number) {
    await this.productRepository.delete(_id);
  }
}
