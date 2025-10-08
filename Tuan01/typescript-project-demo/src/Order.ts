import { Product } from "./Product";

export class Order {
  private products: Product[];

  constructor(products: Product[] = []) {
    this.products = products;
  }

  addProduct(product: Product): void {
    this.products.push(product);
  }

  totalPrice(): number {
    return this.products.reduce((sum, p) => sum + p.price, 0);
  }

  listProducts(): Product[] {
    return this.products.slice();
  }
}
