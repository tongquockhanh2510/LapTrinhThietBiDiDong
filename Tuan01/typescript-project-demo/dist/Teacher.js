"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Teacher = void 0;
const Person_1 = require("./Person");
class Teacher extends Person_1.Person {
    constructor(name, age, subject) {
        super(name, age);
        this.subject = subject;
    }
    introduce() {
        console.log(`Hello, I'm ${this.name}, I teach ${this.subject}.`);
    }
}
exports.Teacher = Teacher;
