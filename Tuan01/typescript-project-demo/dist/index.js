"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function hello(name) {
    return `Hello, ${name}!`;
}
const Person_1 = require("./Person");
const Student_1 = require("./Student");
console.log(hello("200Lab"));
const person1 = new Person_1.Person("Khanh", 18);
person1.displayInfo();
const student = new Student_1.Student("khanh", 12, 12);
student.displayInfo();
