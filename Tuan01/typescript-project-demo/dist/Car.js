"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Car = void 0;
class Car {
    constructor(brand, model, year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }
    showCarInfor() {
        console.log(`Brand : ${this.brand}  Model :${this.model}  Year: ${this.year}`);
    }
    start() {
        console.log(`${this.brand} started.`);
    }
    stop() {
        console.log(`${this.brand} stopped.`);
    }
    getInfo() {
        return `Brand: ${this.brand}, Model: ${this.model}, Year: ${this.year}`;
    }
}
exports.Car = Car;
