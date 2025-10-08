function hello(name: string): string {
  return `Hello, ${name}!`;
}

import { Car } from "./Car";
import { Person } from "./Person";
import { Student } from "./Student";
import { Retangle } from "./Rectangle";
import { BankAccount } from "./BankAccount";
import { Product } from "./Product";
import { Account } from "./Account";
import { Dog } from "./Dog";
import { Cat } from "./Cat";
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

const products : Product[] =[
  new Product("Laptop", 1500),
  new Product("xe dap", 12300),
  new Product("dien thoai", 12)
];
const filteredProducts = products.filter(product => product.price>100)
console.log("San pham co gia >100")
filteredProducts.forEach(console.log)

const account1 = new Account(12345, 1234,"TongQuocKhanh");
console.log(account1)

// Demo: Animal subclasses
const dog = new Dog("Rex");
dog.bark();

const cat = new Cat("Mimi");
cat.meow();