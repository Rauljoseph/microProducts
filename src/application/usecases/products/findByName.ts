import { Inject, Injectable } from '@nestjs/common';
import { IproductRepository } from 'src/domain/repositories/product';

@Injectable()
export class FindByNameProduct {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IproductRepository,
  ) {}
  async execute(name: string) {
    const getProductByName = await this.productRepository.findByName(name);
    if (!getProductByName) {
      throw new Error('No se encontró el nombre del producto');
    }

    return getProductByName;
  }
}
