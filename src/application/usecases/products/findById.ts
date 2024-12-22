import { Inject, Injectable } from '@nestjs/common';
import { IproductRepository } from 'src/domain/repositories/product';

@Injectable()
export class FindById {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepositosy: IproductRepository,
  ) {}

  async execute(id: number) {
    const getProductById = await this.productRepositosy.findById(id);
    if (!getProductById) {
      throw new Error('No se encontró el producto');
    }

    return getProductById;
  }
}
