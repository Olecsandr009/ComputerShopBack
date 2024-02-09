import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubCategoryEntity } from 'src/sub-category/sub-category.entity';
import { NameController } from './name.controller';
import { NameEntity } from './name.entity';
import { NameService } from './name.service';

@Module({
  imports: [TypeOrmModule.forFeature([NameEntity, SubCategoryEntity])],
  controllers: [NameController],
  providers: [NameService],
  exports: [NameService],
})
export class NameModule {}
