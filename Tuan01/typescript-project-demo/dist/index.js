"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function hello(name) {
    return `Hello, ${name}!`;
}
const Product_1 = require("./Product");
const Account_1 = require("./Account");
const Dog_1 = require("./Dog");
const Cat_1 = require("./Cat");
console.log(hello("200Lab"));
//  const person1 = new Person("Khanh",18);
//  person1.displayInfo();
//  const student = new Student( "khanh",12 ,12);
//  student.displayInfo();
//  const car = new Car("Toyota", "mored", 12)
//  car.showCarInfor();
//  const retangle = new Retangle(12,12)
//  console.log("dien tich :"+ retangle.area() + "Chu vi :"+ retangle.perimeter())
//  const bankAccount = new BankAccount(12);
// console.log("tiền gửi là :"+bankAccount.deposit(12))
// console.log("tiền rút là :"+ bankAccount.withdraw(12))
const products = [
    new Product_1.Product("Laptop", 1500),
    new Product_1.Product("xe dap", 12300),
    new Product_1.Product("dien thoai", 12)
];
const filteredProducts = products.filter(product => product.price > 100);
console.log("San pham co gia >100");
filteredProducts.forEach(console.log);
const account1 = new Account_1.Account(12345, 1234, "TongQuocKhanh");
console.log(account1);
// Demo: Animal subclasses
const dog = new Dog_1.Dog("Rex");
dog.bark();
const cat = new Cat_1.Cat("Mimi");
cat.meow();

cón
