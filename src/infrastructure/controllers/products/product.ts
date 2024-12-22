import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreateProduct } from 'src/application/usecases/products/createProduct';
import { DeleteProduct } from 'src/application/usecases/products/deleteProduct';
import { FindAllProducts } from 'src/application/usecases/products/findAll';
import { FindById } from 'src/application/usecases/products/findById';
import { FindByNameProduct } from 'src/application/usecases/products/findByName';
import { UpdateProduct } from 'src/application/usecases/products/updateProduct';
import { Product } from 'src/domain/entities/product';
import { CreateProductDTO } from 'src/infrastructure/DTO/product/productDTO.dto';
import { mapToEntityProduct } from 'src/infrastructure/mappers/products/dtoToProductEntity';

const formatterResponse = (successValue, httpResponse, data) => {
  return {
    success: successValue,
    status: httpResponse,
    data: {
      message: data.message,
      response: data.response,
    },
  };
};

@Controller('products')
export class ProductController {
  constructor(
    private readonly createProduct: CreateProduct,
    private readonly deleteProduct: DeleteProduct,
    private readonly findAll: FindAllProducts,
    private readonly findById: FindById,
    private readonly findByName: FindByNameProduct,
    private readonly updateProduct: UpdateProduct,
  ) {}

  @Post()
  async create(@Body(new ValidationPipe()) dto: CreateProductDTO) {
    const product = mapToEntityProduct(dto);
    try {
      const resultCreateProduct = await this.createProduct.execute(product);

      const data = {
        message: 'Se ha creado exitosamente el producto',
        response: resultCreateProduct,
      };

      return formatterResponse(true, HttpStatus.CREATED, data);
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'No se pudo crear el producto',
          details: error.message || error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async getAllProducts() {
    try {
      const resultFindAllProducts = await this.findAll.execute();
      const data = {
        message: 'All products were found',
        response: resultFindAllProducts,
      };

      return formatterResponse(true, HttpStatus.ACCEPTED, data);
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'No se encontró el listado de productos',
          details: error.message || error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getProductById(@Param('id') id: number) {
    try {
      const resultGetProductById = await this.findById.execute(id);

      const data = {
        message: 'Producto encontrado',
        response: resultGetProductById,
      };

      return formatterResponse(true, HttpStatus.OK, data);
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'No se encontró el producto',
          details: error.message || error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Get('search')
  async getProductByName(@Query('name') name: string) {
    try {
      const resultGetProductByName = await this.findByName.execute(name);

      const data = {
        message: 'Producto encontrado',
        response: resultGetProductByName,
      };

      return formatterResponse(true, HttpStatus.OK, data);
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'No se encontró el producto',
          details: error.message || error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async deleteProductById(@Param('id') id: number) {
    try {
      const resultDeleteProductById = await this.deleteProduct.execute(id);

      const data = {
        message: 'Producto eliminado exitosamente',
        response: resultDeleteProductById,
      };

      return formatterResponse(true, HttpStatus.OK, data);
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'No se encontró el producto',
          details: error.message || error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  async updateProductById(
    @Param('id') id: number,
    @Body() product: Partial<Product>,
  ) {
    try {
      const resultUpdateProduct = await this.updateProduct.execute(id, product);

      const data = {
        message: 'Producto actualizado exitosamente',
        response: resultUpdateProduct,
      };

      return formatterResponse(true, HttpStatus.OK, data);
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'No se encontró el producto',
          details: error.message || error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
