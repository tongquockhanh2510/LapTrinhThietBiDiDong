"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function hello(name) {
    return `Hello, ${name}!`;
}
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
// const products : Product[] =[
//   new Product("Laptop", 1500),
//   new Product("xe dap", 12300),
//   new Product("dien thoai", 12)
// ];
// const filteredProducts = products.filter(product => product.price>100)
// console.log("San pham co gia >100")
// filteredProducts.forEach(console.log)
// const account1 = new Account(12345, 1234,"TongQuocKhanh");
// console.log(account1)
// const dog = new Dog("Rex");
// dog.bark();
// const cat = new Cat("Mimi");
// cat.meow();
// const fish = new Fish();  
// fish.swim();  
// const bird = new Bird();
// bird.fly(); 
const Square_1 = require("./Square");
const Circle_1 = require("./Circle");
const square = new Square_1.Square(4);
const circle = new Circle_1.Circle(3);
console.log(`Area of square: ${square.area()}`);
console.log(`Area of circle: ${circle.area().toFixed(2)}`);
