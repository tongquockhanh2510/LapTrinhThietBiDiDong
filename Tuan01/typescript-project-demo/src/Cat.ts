
import { Animal } from "./Animal";

export class Cat extends Animal {
  meow(): void {
    console.log(`${this.name} says: Meow~`);
  }

  speak(): void {
    // override base implementation
    console.log(`${this.name} meows: Meow~`);
  }
}
