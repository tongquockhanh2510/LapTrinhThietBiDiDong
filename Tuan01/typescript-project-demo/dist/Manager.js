"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manager = void 0;
const Employee_1 = require("./Employee");
class Manager extends Employee_1.Employee {
    constructor(name, salary, teamSize = 0) {
        super(name, salary);
        this.teamSize = teamSize;
    }
    manage() {
        console.log(`${this.name} is managing a team of ${this.teamSize}`);
    }
    addBonus(amount) {
        console.log(`${this.name} received a bonus of ${amount}`);
        this.raise(amount);
    }
}
exports.Manager = Manager;
