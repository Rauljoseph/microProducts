import { Product } from 'src/domain/entities/product';
import { CreateProductDTO } from '../../DTO/product/productDTO.dto';

export function mapToEntityProduct(dto: CreateProductDTO): Product {
  return new Product(
    null,
    dto.name,
    dto.description,
    dto.price,
    dto.stock,
    dto.category,
  );
}
