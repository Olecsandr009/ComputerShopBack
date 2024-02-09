import { NameEntity } from 'src/name/name.entity';
import { ProductEntity } from 'src/product/product.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoryEntity } from '../category/category.entity';

@Entity({ name: 'SubCategoryEntity' })
export class SubCategoryEntity {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @ManyToOne(() => CategoryEntity, (category) => category.subCategory)
  category: CategoryEntity;

  @OneToMany(() => NameEntity, (name) => name.subCategory)
  nameProduct: NameEntity;

  @OneToMany(() => ProductEntity, (product) => product.subCategory)
  product: ProductEntity;
}
