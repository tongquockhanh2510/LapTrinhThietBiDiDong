"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Animal = void 0;
class Animal {
    constructor(name) {
        this.name = name;
    }
    // protected method intended to be overridden by subclasses
    makeSound() {
        return "makes a sound.";
    }
    speak() {
        console.log(`${this.name} ${this.makeSound()}`);
    }
}
exports.Animal = Animal;
