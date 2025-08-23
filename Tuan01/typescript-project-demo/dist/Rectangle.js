"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Retangle = void 0;
class Retangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    area() {
        return this.width * this.height;
    }
    perimeter() {
        return (this.height + this.width) * 2;
    }
}
exports.Retangle = Retangle;
