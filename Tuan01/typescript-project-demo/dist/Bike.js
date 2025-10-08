"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bike = void 0;
class Bike {
    constructor(brand, type = "road") {
        this.brand = brand;
        this.type = type;
    }
    start() {
        console.log(`${this.brand} bike started.`);
    }
    stop() {
        console.log(`${this.brand} bike stopped.`);
    }
    getInfo() {
        return `Brand: ${this.brand}, Type: ${this.type}`;
    }
}
exports.Bike = Bike;
