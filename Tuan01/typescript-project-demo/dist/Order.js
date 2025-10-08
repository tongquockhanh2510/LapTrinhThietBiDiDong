"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
class Order {
    constructor(products = []) {
        this.products = products;
    }
    addProduct(product) {
        this.products.push(product);
    }
    totalPrice() {
        return this.products.reduce((sum, p) => sum + p.price, 0);
    }
    listProducts() {
        return this.products.slice();
    }
}
exports.Order = Order;
