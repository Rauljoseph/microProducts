import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { Product } from 'src/domain/entities/product';

@Table({
  tableName: 'products',
  timestamps: false,
})
export class ProductModel extends Model<Product> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  stock: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  category: string;
}
