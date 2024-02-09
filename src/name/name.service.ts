import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubCategoryEntity } from 'src/sub-category/sub-category.entity';
import { DataSource, Repository } from 'typeorm';
import { NameDTO } from './name.dto';
import { NameEntity } from './name.entity';

@Injectable()
export class NameService {
  constructor(
    @InjectRepository(NameEntity)
    private nameRepository: Repository<NameEntity>,
    @InjectRepository(SubCategoryEntity)
    private subCategoryRepository: Repository<SubCategoryEntity>,
    private dataSource: DataSource,
  ) {}

  async findOne(_id: number) {
    return await this.nameRepository.findOneBy({ _id });
  }

  async find() {
    return await this.nameRepository.find();
  }

  async findChildren() {
    return await this.nameRepository.find({
      relations: ['product'],
    });
  }

  async createName(NameData: NameDTO) {
    const name = new NameEntity();

    name.name = NameData.name;

    const subCategory = await this.subCategoryRepository.findOneBy({
      _id: NameData.subCategoryId,
    });

    name.subCategory = subCategory;

    await this.dataSource.transaction(
      async (manager) => await manager.save(name),
    );
  }

  async findChildrenByName(name: string) {
    return await this.nameRepository.find({
      where: { name },
      relations: ['product'],
    });
  }

  async deleteCategory(id: number) {
    await this.nameRepository.delete(id);
  }
}
