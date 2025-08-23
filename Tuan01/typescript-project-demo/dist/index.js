"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function hello(name) {
    return `Hello, ${name}!`;
}
const Person_1 = require("./Person");
console.log(hello("200Lab"));
const person1 = new Person_1.Person("Khanh", 18);
person1.displayInfo();
