import {
  EnumProductFlags,
  EnumProductStatus,
} from 'src/product/product.entity';

export class createProductDTO {
  model: string;
  nameId: number;
  brandId: number;
  color: string[];
  status?: EnumProductStatus;
  price: number;
  discount?: number;
  description: string;
  characteristics: string;
  categoryId: number;
  subCategoryId: number;
  article: string;
  guarantee: number;
  slug: string;
  flag: EnumProductFlags;
  image: string[];
}
