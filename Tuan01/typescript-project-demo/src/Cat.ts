
import { Animal } from "./Animal";

export class Cat extends Animal {
  meow(): void {
    console.log(`${this.name} says: Meow~`);
  }

  protected makeSound(): string {
    return "meows: Meow~";
  }
}
