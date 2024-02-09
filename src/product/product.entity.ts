import { CategoryEntity } from 'src/category/category.entity';
import { NameEntity } from 'src/name/name.entity';
import { SubCategoryEntity } from 'src/sub-category/sub-category.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BrandEntity } from '../brand/brand.entity';

export enum EnumProductStatus {
  ISSTOCK = 'є в наявності',
  NOTSTOCK = 'немає в наявності',
  ISDELIVERY = 'очікується поставка',
}

export enum EnumProductFlags {
  DISCOUT = 'знижка',
  NOTSTOCK = 'немає в наявності',
  ACTION = 'акція',
  PREORDER = 'попереднє замовлення',
  NOVELTY = 'новинка',
}

@Entity({ name: 'ProductEntity' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  model: string;

  @Column('text', { array: true })
  color: string[];

  @Column({
    type: 'enum',
    enum: EnumProductStatus,
    default: EnumProductStatus.ISSTOCK,
  })
  status: EnumProductStatus;

  @Column({ default: 0 })
  price: number;

  @Column({ default: 0 })
  discount: number;

  @Column({ default: 'немає опису' })
  description: string;

  @Column()
  characteristics: string;

  @Column('text', { array: true })
  image: string[];

  @ManyToOne(() => CategoryEntity, (category) => category.product)
  category: CategoryEntity;

  @ManyToOne(() => SubCategoryEntity, (subCategory) => subCategory.product)
  subCategory: SubCategoryEntity;

  @ManyToOne(() => NameEntity, (name) => name.product)
  nameProduct: NameEntity;

  @ManyToOne(() => BrandEntity, (brand) => brand.product)
  brand: BrandEntity;

  @Column()
  article: string;

  @Column('int', { array: true, default: [0, 0, 0, 0, 0] })
  rating: number[];

  @Column()
  guarantee: number;

  @Column()
  slug: string; // product path

  @Column({
    type: 'enum',
    enum: EnumProductFlags,
  })
  flag: EnumProductFlags;
}
