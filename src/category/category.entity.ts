import { ProductEntity } from 'src/product/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SubCategoryEntity } from '../sub-category/sub-category.entity';

@Entity({ name: 'CategoryEntity' })
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  name: string;

  @OneToMany(() => ProductEntity, (product) => product.category)
  product: ProductEntity;

  @OneToMany(() => SubCategoryEntity, (subCategory) => subCategory.category)
  subCategory: SubCategoryEntity;
}
