import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, ILike, Repository } from 'typeorm';
import { CategoryDTO } from './category.dto';
import { CategoryEntity } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
    private dataSource: DataSource,
  ) {}

  async findOne(_id: number) {
    return await this.categoryRepository.findOneBy({ _id });
  }

  async find(): Promise<CategoryEntity[]> {
    const category = await this.categoryRepository.find();
    return category;
  }

  async findChildren() {
    return await this.categoryRepository.find({
      relations: ['subCategory'],
    });
  }

  async searchCategories(searchTerm: string) {
    return await this.categoryRepository.find({
      where: { name: ILike(`%${searchTerm}%`) },
    });
  }

  async findChildrenByName(name: string) {
    return await this.categoryRepository.find({
      where: { name },
      relations: ['subCategory'],
    });
  }

  async createCategory(categoryData: CategoryDTO) {
    const category = new CategoryEntity();

    category.name = categoryData.name;

    await this.dataSource.transaction(
      async (manager) => await manager.save(category),
    );
  }

  async deleteCategory(id: number) {
    await this.categoryRepository.delete(id);
  }
}
