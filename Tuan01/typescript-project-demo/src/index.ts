function hello(name: string): string {
  return `Hello, ${name}!`;
}

import { Car } from "./Car";
import { Person } from "./Person";
import { Student } from "./Student";
import { Retangle } from "./Rectangle";
console.log(hello("200Lab"));
 const person1 = new Person("Khanh",18);
 person1.displayInfo();

 const student = new Student( "khanh",12 ,12);
 student.displayInfo();

 const car = new Car("Toyota", "mored", 12)
 car.showCarInfor();

 const retangle = new Retangle(12,12)
 console.log("dien tich :"+ retangle.area() + "Chu vi :"+ retangle.perimeter())
