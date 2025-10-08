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
import { Animal } from "./Animal";
import { Cat } from "./Cat";
import { Fish } from "./Fish";
import { Bird } from "./Bird";
import { Square } from "./Square";
import { Circle } from "./Circle";
import { Manager } from "./Manager";
import { Developer } from "./Developer";
import { Library } from "./Library";
import { Book } from "./Book";
import { User } from "./User";
import { Box } from "./Box";
import { Logger } from "./Logger";
import { MathUtil } from "./MathUtil";
import { Bike } from "./Bike";
import { Vehicle } from "./Vehicle";

// Basic greeting
console.log(hello("200Lab"));

// Person example
const person1 = new Person("Khanh", 18);
person1.displayInfo();

// Student example
const student = new Student("KhanhStudent", 12, 12);
student.displayInfo();

// Car example
const car = new Car("Toyota", "modern", 12);
car.showCarInfor();

// Rectangle example
const retangle = new Retangle(12, 12);
console.log("dien tich :" + retangle.area());
console.log("Chu vi :" + retangle.perimeter());

// BankAccount example
const bankAccount = new BankAccount(12);
console.log("tiền gửi là :" + bankAccount.deposit(12));
console.log("tiền rút là :" + bankAccount.withdraw(6));

// Product filtering example
const products: Product[] = [new Product("Laptop", 1500), new Product("xe dap", 12300), new Product("dien thoai", 12)];
const filteredProducts = products.filter(product => product.price > 100);
console.log("San pham co gia >100");
filteredProducts.forEach(p => console.log(p));

// Account example
const account1 = new Account(12345, 1234, "TongQuocKhanh");
console.log(account1);

// Animal examples
const dog = new Dog("Rex");
dog.bark();

const cat = new Cat("Mimi");
cat.meow();

const fish = new Fish();
fish.swim();

const bird = new Bird();
bird.fly();

// Shape examples
const square = new Square(4);
console.log(`Area of square: ${square.area()}`);

const circle = new Circle(3);
console.log(`Area of circle: ${circle.area().toFixed(2)}`);

// Employee examples
const mgr = new Manager("Alice", 90000, 5);
mgr.manage();
mgr.addBonus(5000);
console.log(mgr.getInfo());

const dev = new Developer("Bob", 70000, "JavaScript");
dev.writeCode();
dev.debug();
console.log(dev.getInfo());

// Library example
const library = new Library();
const book1 = new Book("The TypeScript Handbook", "Microsoft", 2020);
const book2 = new Book("Learning JS", "Author A", 2018);
const user1 = new User("Charlie");

library.addBook(book1);
library.addBook(book2);
library.addUser(user1);

console.log("Library books:");
library.listBooks().forEach(b => console.log(`${b.title} by ${b.author} (${b.year})`));

const found = library.findBookByTitle("Learning JS");
console.log("Found:", found ? found.title : "Not found");

// Box (generic) examples
const numberBox = new Box<number>(42);
console.log("Box contains number:", numberBox.get());

const stringBox = new Box<string>("hello box");
console.log("Box contains string:", stringBox.get());

// Logger (singleton) examples
const logger = Logger.getInstance();
logger.log("This is a log message");
logger.info("This is an info message");
logger.warn("This is a warning");
logger.error("This is an error message");

// MathUtil examples
console.log("Math add:", MathUtil.add(2, 3));
console.log("Math subtract:", MathUtil.subtract(5, 2));
console.log("Math multiply:", MathUtil.multiply(4, 3));
console.log("Math divide:", MathUtil.divide(10, 2));

// Polymorphism demo: treat Dog and Cat as Animal and call speak()
const animals: Animal[] = [new Dog("Rex"), new Cat("Mimi"), new Animal("Generic")];
animals.forEach(a => a.speak());

// Vehicle demo: Car and Bike implement Vehicle
const bike = new Bike("Giant", "mountain");
bike.start();
bike.stop();
console.log(bike.getInfo());

const vehicles: Vehicle[] = [car, bike];
vehicles.forEach(v => console.log(v.getInfo()));
