import { Inject, Injectable } from '@nestjs/common';
import { IproductRepository } from 'src/domain/repositories/product';

@Injectable()
export class FindAllProducts {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IproductRepository,
  ) {}
  async execute() {
    const getAllProducts = await this.productRepository.findAll();
    if (!getAllProducts) {
      throw new Error('No se pudo cargar el catalogo de productos');
    }
    return getAllProducts;
  }
}
