import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandEntity } from 'src/brand/brand.entity';
import { DataSource, Repository } from 'typeorm';
import { BrandDTO } from './brand.dto';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(BrandEntity)
    private brandRepository: Repository<BrandEntity>,
    private dataSource: DataSource,
  ) {}

  async findOne(_id: number) {
    return await this.brandRepository.findOneBy({ _id });
  }

  async find() {
    return await this.brandRepository.find();
  }

  //Create
  async createBrand(brandData: BrandDTO) {
    const brand = new BrandEntity();

    brand.name = brandData.name;
    brand.image = brandData.image;

    await this.dataSource.transaction(
      async (manager) => await manager.save(brand),
    );
  }

  //Delete
  async deleteBrand(_id: number) {
    await this.brandRepository.delete(_id);
  }
}
