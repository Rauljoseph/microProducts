import { Product } from '../entities/product';

export interface IproductRepository {
  findById(id: number): Promise<Product | null>;
  findByName(name: string): Promise<Product | null>;
  findAll(): Promise<Product[] | null>;
  createProduct(product: Product): Promise<Product>;
  updateProduct(id: number, product: Partial<Product>): Promise<Product | null>;
  deleteProduct(id: number): Promise<boolean>;
}
