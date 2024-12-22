import { Product } from 'src/domain/entities/product';
import { ProductModel } from 'src/infrastructure/model/product';

export class ProductMapper {
  static toDomain(model: ProductModel): Product {
    return new Product(
      model.id,
      model.name,
      model.description,
      model.price,
      model.stock,
      model.category,
    );
  }

  static toPersistence(entity: Product): Partial<ProductModel> {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      price: entity.price,
      stock: entity.stock,
      category: entity.category,
    };
  }
}
