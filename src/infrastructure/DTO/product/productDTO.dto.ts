import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateProductDTO {
  @IsString()
  @MaxLength(255)
  name: string;
  @IsString()
  @IsOptional()
  description?: string;
  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  stock: number;
  @IsString()
  @IsOptional()
  category?: string;
}
