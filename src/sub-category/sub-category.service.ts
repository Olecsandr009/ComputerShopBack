import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/category/category.entity';
import { SubCategoryEntity } from 'src/sub-category/sub-category.entity';
import { DataSource, Repository } from 'typeorm';
import { SubCategoryDTO } from './sub-category.dto';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectRepository(SubCategoryEntity)
    private subCategoryRepository: Repository<SubCategoryEntity>,
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
    private dataSource: DataSource,
  ) {}

  async findOne(_id: number) {
    return await this.subCategoryRepository.findOneBy({ _id });
  }

  async find() {
    return await this.subCategoryRepository.find();
  }

  async findChildren() {
    return await this.subCategoryRepository.find({
      relations: ['nameProduct'],
    });
  }

  async searchMany(searchTerm: string) {
    return await this.subCategoryRepository
      .createQueryBuilder('subCategory')
      .where('LOWER(subCategory.name) LIKE LOWER(:searchTerm)', {
        searchTerm: `%${searchTerm}%`,
      })
      .getMany();
  }

  async createSubCategory(subCategoryData: SubCategoryDTO) {
    const subCategory = new SubCategoryEntity();

    subCategory.name = subCategoryData.name;
    subCategory.image = subCategoryData.image;

    const category = await this.categoryRepository.findOneBy({
      _id: subCategoryData.categoryId,
    });

    subCategory.category = category;

    await this.dataSource.transaction(
      async (manager) => await manager.save(subCategory),
    );
  }

  async findChildrenByName(name: string) {
    return await this.subCategoryRepository.find({
      where: { name },
      relations: ['nameProduct'],
    });
  }

  async findSubCategoryByCount(count: number) {
    return await this.subCategoryRepository.find({
      take: count,
    });
  }

  async deleteSubCategory(id: number) {
    await this.subCategoryRepository.delete(id);
  }
}
