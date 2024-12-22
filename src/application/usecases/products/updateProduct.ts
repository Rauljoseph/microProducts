import { IproductRepository } from 'src/domain/repositories/product';
import { FindById } from './findById';
import { Product } from 'src/domain/entities/product';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UpdateProduct {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IproductRepository,
    private readonly getProductById: FindById,
  ) {}
  async execute(id: number, product: Partial<Product>) {
    const findById = await this.getProductById.execute(id);

    if (!findById) {
      throw new Error('No se encontró el ID');
    }

    const updateProduct = await this.productRepository.updateProduct(
      id,
      product,
    );

    if (!updateProduct) {
      throw new Error('No se pudo actualizar el producto');
    }

    return updateProduct;
  }
}
