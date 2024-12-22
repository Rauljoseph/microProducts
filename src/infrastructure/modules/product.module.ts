import { Module } from '@nestjs/common';
import { ProductController } from '../controllers/products/product';
import { CreateProduct } from 'src/application/usecases/products/createProduct';
import { DeleteProduct } from 'src/application/usecases/products/deleteProduct';
import { FindAllProducts } from 'src/application/usecases/products/findAll';
import { FindById } from 'src/application/usecases/products/findById';
import { FindByNameProduct } from 'src/application/usecases/products/findByName';
import { UpdateProduct } from 'src/application/usecases/products/updateProduct';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductModel } from '../model/product';
import { ProductRepositoryPG } from '../repositories/productRepository/product';

@Module({
  imports: [SequelizeModule.forFeature([ProductModel])],
  controllers: [ProductController],
  providers: [
    {
      provide: 'IProductRepository',
      useClass: ProductRepositoryPG,
    },
    CreateProduct,
    DeleteProduct,
    FindAllProducts,
    FindById,
    FindByNameProduct,
    UpdateProduct,
    ProductRepositoryPG,
  ],
  exports: ['IProductRepository'],
})
export class ProductModule {}
