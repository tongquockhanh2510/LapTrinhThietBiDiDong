"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function hello(name) {
    return `Hello, ${name}!`;
}
const Car_1 = require("./Car");
const Person_1 = require("./Person");
const Student_1 = require("./Student");
const Rectangle_1 = require("./Rectangle");
const BankAccount_1 = require("./BankAccount");
const Product_1 = require("./Product");
const Account_1 = require("./Account");
const Dog_1 = require("./Dog");
const Animal_1 = require("./Animal");
const Cat_1 = require("./Cat");
const Fish_1 = require("./Fish");
const Bird_1 = require("./Bird");
const Square_1 = require("./Square");
const Circle_1 = require("./Circle");
const Shape_1 = require("./Shape");
const Manager_1 = require("./Manager");
const Developer_1 = require("./Developer");
const Library_1 = require("./Library");
const Book_1 = require("./Book");
const User_1 = require("./User");
const Box_1 = require("./Box");
const Logger_1 = require("./Logger");
const MathUtil_1 = require("./MathUtil");
const Bike_1 = require("./Bike");
const Repository_1 = require("./Repository");
const Stack_1 = require("./Stack");
const CashPayment_1 = require("./CashPayment");
const CardPayment_1 = require("./CardPayment");
const Fan_1 = require("./Fan");
const AirConditioner_1 = require("./AirConditioner");
// Basic greeting
console.log(hello("200Lab"));
// Person example
const person1 = new Person_1.Person("Khanh", 18);
person1.displayInfo();
// Student example
const student = new Student_1.Student("KhanhStudent", 12, 12);
student.displayInfo();
// Car example
const car = new Car_1.Car("Toyota", "modern", 12);
car.showCarInfor();
// Rectangle example
const retangle = new Rectangle_1.Retangle(12, 12);
console.log("dien tich :" + retangle.area());
console.log("Chu vi :" + retangle.perimeter());
// BankAccount example
const bankAccount = new BankAccount_1.BankAccount(12);
console.log("tiền gửi là :" + bankAccount.deposit(12));
console.log("tiền rút là :" + bankAccount.withdraw(6));
// Product filtering example
const products = [new Product_1.Product("Laptop", 1500), new Product_1.Product("xe dap", 12300), new Product_1.Product("dien thoai", 12)];
const filteredProducts = products.filter(product => product.price > 100);
console.log("San pham co gia >100");
filteredProducts.forEach(p => console.log(p));
// Account example
const account1 = new Account_1.Account(12345, 1234, "TongQuocKhanh");
console.log(account1);
// Animal examples
const dog = new Dog_1.Dog("Rex");
dog.bark();
const cat = new Cat_1.Cat("Mimi");
cat.meow();
const fish = new Fish_1.Fish();
fish.swim();
const bird = new Bird_1.Bird();
bird.fly();
// Shape examples
const square = new Square_1.Square(4);
console.log(`Area of square: ${square.area()}`);
const circle = new Circle_1.Circle(3);
console.log(`Area of circle: ${circle.area().toFixed(2)}`);
// Static method demo on Shape
console.log(Shape_1.Shape.describe());
// Employee examples
const mgr = new Manager_1.Manager("Alice", 90000, 5);
mgr.manage();
mgr.addBonus(5000);
console.log(mgr.getInfo());
const dev = new Developer_1.Developer("Bob", 70000, "JavaScript");
dev.writeCode();
dev.debug();
console.log(dev.getInfo());
// Library example
const library = new Library_1.Library();
const book1 = new Book_1.Book("The TypeScript Handbook", "Microsoft", 2020);
const book2 = new Book_1.Book("Learning JS", "Author A", 2018);
const user1 = new User_1.User("Charlie");
library.addBook(book1);
library.addBook(book2);
library.addUser(user1);
console.log("Library books:");
library.listBooks().forEach(b => console.log(`${b.title} by ${b.author} (${b.year})`));
const found = library.findBookByTitle("Learning JS");
console.log("Found:", found ? found.title : "Not found");
// Box (generic) examples
const numberBox = new Box_1.Box(42);
console.log("Box contains number:", numberBox.get());
const stringBox = new Box_1.Box("hello box");
console.log("Box contains string:", stringBox.get());
// Logger (singleton) examples
const logger = Logger_1.Logger.getInstance();
logger.log("This is a log message");
logger.info("This is an info message");
logger.warn("This is a warning");
logger.error("This is an error message");
// MathUtil examples
console.log("Math add:", MathUtil_1.MathUtil.add(2, 3));
console.log("Math subtract:", MathUtil_1.MathUtil.subtract(5, 2));
console.log("Math multiply:", MathUtil_1.MathUtil.multiply(4, 3));
console.log("Math divide:", MathUtil_1.MathUtil.divide(10, 2));
// Polymorphism demo: treat Dog and Cat as Animal and call speak()
const animals = [new Dog_1.Dog("Rex"), new Cat_1.Cat("Mimi"), new Animal_1.Animal("Generic")];
animals.forEach(a => a.speak());
// Vehicle demo: Car and Bike implement Vehicle
const bike = new Bike_1.Bike("Giant", "mountain");
bike.start();
bike.stop();
console.log(bike.getInfo());
const vehicles = [car, bike];
vehicles.forEach(v => console.log(v.getInfo()));
// Repository examples
const bookRepo = new Repository_1.Repository();
bookRepo.add(book1);
bookRepo.add(book2);
console.log("Books in repository:", bookRepo.getAll());
const userRepo = new Repository_1.Repository();
userRepo.add(user1);
console.log("Users in repository:", userRepo.getAll());
// Stack example
const stack = new Stack_1.Stack();
stack.push(1);
stack.push(2);
console.log("Stack peek:", stack.peek());
console.log("Stack pop:", stack.pop());
console.log("Stack is empty:", stack.isEmpty());
// Payment examples
const cash = new CashPayment_1.CashPayment();
cash.pay(50);
const card = new CardPayment_1.CardPayment("1234567812345678");
card.pay(120.5);
// Appliance examples
const fan = new Fan_1.Fan("Living Room Fan", 3);
fan.turnOn();
const ac = new AirConditioner_1.AirConditioner("Bedroom AC", 22);
ac.turnOn();
