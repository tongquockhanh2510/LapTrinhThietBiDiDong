"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirConditioner = void 0;
const Appliance_1 = require("./Appliance");
class AirConditioner extends Appliance_1.Appliance {
    constructor(name, temperature = 24) {
        super(name);
        this.temperature = temperature;
    }
    turnOn() {
        console.log(`${this.name} AC is ON set to ${this.temperature}°C`);
    }
}
exports.AirConditioner = AirConditioner;
