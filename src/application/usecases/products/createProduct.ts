import { Product } from 'src/domain/entities/product';
import { IproductRepository } from 'src/domain/repositories/product';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreateProduct {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IproductRepository,
  ) {}

  async execute(product: Product) {
    const createProduct = await this.productRepository.createProduct(product);
    if (!createProduct) {
      throw new Error('No se pudo crear el producto');
    }

    return createProduct;
  }
}
