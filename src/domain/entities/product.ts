export class Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  created_at: Date;
  updated_at: Date;
  constructor(
    id: number,
    name: string,
    description: string,
    price: number,
    stock: number,
    category: string,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.category = category;
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  minimumStock() {
    if (this.stock < 0) {
      throw Error('No puede existir stock menor de cero');
    }
  }

  reduceStock(amount) {
    if (amount <= 0) {
      throw new Error('La cantidad a reducir debe ser mayor que cero');
    }
    if (this.stock - amount < 0) {
      throw new Error('No hay suficiente stock disponible');
    }
    this.stock -= amount;
    this.updated_at = new Date();
  }

  addStock(amount) {
    if (amount <= 0) {
      throw new Error('La cantidad a agregar debe ser mayor que cero');
    }
    this.stock += amount;
    this.updated_at = new Date();
  }
}

// interface ProductInterface {
//     id: number;
//   name: string;
//   description: string;
//   price: number;
//   stock: number;
//   category: string;
//   created_at: Date;
//   updated_at: Date;
// }
