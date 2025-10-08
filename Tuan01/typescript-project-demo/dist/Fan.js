"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fan = void 0;
const Appliance_1 = require("./Appliance");
class Fan extends Appliance_1.Appliance {
    constructor(name, speed = 1) {
        super(name);
        this.speed = speed;
    }
    turnOn() {
        console.log(`${this.name} fan is ON at speed ${this.speed}`);
    }
}
exports.Fan = Fan;
