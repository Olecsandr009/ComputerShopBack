import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from '../product/product.entity';

@Entity({ name: 'BrandEntity' })
export class BrandEntity {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @OneToMany(() => ProductEntity, (product) => product.brand)
  product: ProductEntity;
}
