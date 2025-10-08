"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
class Employee {
    constructor(name, salary) {
        this.name = name;
        this.salary = salary;
    }
    getInfo() {
        return `Employee: ${this.name}, Salary: ${this.salary}`;
    }
    raise(amount) {
        this.salary += amount;
    }
}
exports.Employee = Employee;
