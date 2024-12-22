import { IproductRepository } from 'src/domain/repositories/product';
import { FindById } from './findById';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class DeleteProduct {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IproductRepository,
    private readonly getProductById: FindById,
  ) {}
  async execute(id: number) {
    const getProductById = await this.getProductById.execute(id);
    if (!getProductById) {
      throw new Error('No se encontró el ID del producto a eliminar');
    }

    return await this.productRepository.deleteProduct(id);
  }
}
