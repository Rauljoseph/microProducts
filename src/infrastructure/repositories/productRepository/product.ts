import { InjectModel } from '@nestjs/sequelize';
import { ProductModel } from 'src/infrastructure/model/product';
import { IproductRepository } from 'src/domain/repositories/product';
import { Injectable } from '@nestjs/common';
import { Product } from 'src/domain/entities/product';
import { ProductMapper } from 'src/infrastructure/mappers/products/productMapper';

@Injectable()
export class ProductRepositoryPG implements IproductRepository {
  constructor(
    @InjectModel(ProductModel)
    private readonly productModel: typeof ProductModel,
  ) {}

  async findById(id: number): Promise<Product | null> {
    const findProductById = await this.productModel.findOne({
      where: { id: id },
    });
    return findProductById ? ProductMapper.toDomain(findProductById) : null;
  }
  async findByName(name: string): Promise<Product | null> {
    const findProductByName = await this.productModel.findOne({
      where: { name: name },
    });
    return findProductByName ? ProductMapper.toDomain(findProductByName) : null;
  }
  async findAll(): Promise<Product[] | null> {
    const listOfProducts = await this.productModel.findAll();
    return listOfProducts.map(ProductMapper.toDomain);
  }
  async createProduct(product: Product): Promise<Product> {
    const productData = ProductMapper.toPersistence(product);
    const createdProduct = await this.productModel.create(productData);
    return ProductMapper.toDomain(createdProduct);
  }
  async updateProduct(
    id: number,
    product: Partial<Product>,
  ): Promise<Product | null> {
    const [rowsAffected] = await this.productModel.update(product, {
      where: { id: id },
    });

    if (rowsAffected === 0) {
      return null; // Si no se afectaron filas, el producto no existe
    }

    return await this.findById(id);
  }
  async deleteProduct(id: number): Promise<boolean> {
    const deleteProductById = await this.productModel.destroy({
      where: { id: id },
    });
    return deleteProductById ? true : false;
  }
}
