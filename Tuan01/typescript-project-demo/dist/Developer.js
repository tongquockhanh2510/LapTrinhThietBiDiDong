"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Developer = void 0;
const Employee_1 = require("./Employee");
class Developer extends Employee_1.Employee {
    constructor(name, salary, language = "TypeScript") {
        super(name, salary);
        this.language = language;
    }
    writeCode() {
        console.log(`${this.name} is writing ${this.language} code.`);
    }
    debug() {
        console.log(`${this.name} is debugging ${this.language} code.`);
    }
}
exports.Developer = Developer;
