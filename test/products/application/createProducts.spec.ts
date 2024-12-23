import { Test, TestingModule } from '@nestjs/testing';
import { CreateProduct } from '../../../src/application/usecases/products/createProduct';
import { FindById } from '../../../src/application/usecases/products/findById';
import { DeleteProduct } from '../../../src/application/usecases/products/deleteProduct';
import { FindAllProducts } from '../../../src/application/usecases/products/findAll';
import { FindByNameProduct } from '../../../src/application/usecases/products/findByName';
import { UpdateProduct } from '../../../src/application/usecases/products/updateProduct';
import { ProductController } from '../../../src/infrastructure/controllers/products/product';

describe('ProductController', () => {
  let productController: ProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: CreateProduct,
          useValue: {
            execute: jest.fn().mockResolvedValue({
              name: 'Laptop Gamer',
              description: 'Laptop de alto rendimiento para juegos',
              price: 1500.99,
              stock: 25,
              category: 'Electronics',
            }),
          },
        },
        {
          provide: FindById,
          useValue: {
            execute: jest.fn().mockResolvedValue({
              id: 1,
              name: 'Laptop Gamer',
              description: 'Laptop de alto rendimiento para juegos',
              price: 1500.99,
              stock: 25,
              category: 'Electronics',
            }),
          },
        },
        {
          provide: DeleteProduct, // Mock para DeleteProduct
          useValue: {
            execute: jest.fn().mockResolvedValue({ success: true }),
          },
        },
        {
          provide: FindAllProducts, // Mock para FindAllProducts
          useValue: {
            execute: jest.fn().mockResolvedValue([]),
          },
        },
        {
          provide: FindByNameProduct, // Mock para FindByNameProduct
          useValue: {
            execute: jest.fn().mockResolvedValue(null),
          },
        },
        {
          provide: UpdateProduct, // Mock para UpdateProduct
          useValue: {
            execute: jest.fn().mockResolvedValue({ success: true }),
          },
        },
      ],
    }).compile();

    productController = module.get<ProductController>(ProductController);
  });

  it('debería crear un producto', async () => {
    const dto = {
      name: 'Laptop Gamer',
      description: 'Laptop de alto rendimiento para juegos',
      price: 1500.99,
      stock: 25,
      category: 'Electronics',
    };

    const result = await productController.create(dto);

    expect(result.success).toBe(true);
    expect(result.data.response.name).toBe('Laptop Gamer');
  });

  it('debería obtener un producto por id', async () => {
    const id = 1;
    const result = await productController.getProductById(id);

    expect(result.data.response.id).toBe(1);
    expect(result.data.response.name).toBe('Laptop Gamer');
  });
});
