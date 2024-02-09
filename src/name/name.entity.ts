import { ProductEntity } from 'src/product/product.entity';
import { SubCategoryEntity } from 'src/sub-category/sub-category.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'NameEntity' })
export class NameEntity {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  name: string;

  @ManyToOne(() => SubCategoryEntity, (subCategory) => subCategory.nameProduct)
  subCategory: SubCategoryEntity;

  @OneToMany(() => ProductEntity, (product) => product.nameProduct)
  product: ProductEntity;
}
