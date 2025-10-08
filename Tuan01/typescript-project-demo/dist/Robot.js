"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Robot = void 0;
class Robot {
    constructor(id) {
        this.id = id;
    }
    move(distance) {
        console.log(`Robot ${this.id} moves ${distance} meters.`);
    }
}
exports.Robot = Robot;
