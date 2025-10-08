import { Animal } from "./Animal";

export class Dog extends Animal {
  bark(): void {
    console.log(`${this.name} says: Woof! Woof!`);
  }

  speak(): void {
    // override base implementation
    console.log(`${this.name} barks: Woof!`);
  }
}