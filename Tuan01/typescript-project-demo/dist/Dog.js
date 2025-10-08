"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dog = void 0;
const Animal_1 = require("./Animal");
class Dog extends Animal_1.Animal {
    bark() {
        console.log(`${this.name} says: Woof! Woof!`);
    }
    makeSound() {
        return "barks: Woof!";
    }
}
exports.Dog = Dog;
