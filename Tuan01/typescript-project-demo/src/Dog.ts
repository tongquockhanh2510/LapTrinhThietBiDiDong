import { Animal } from "./Animal";

export class Dog extends Animal {
  bark(): void {
    console.log(`${this.name} says: Woof! Woof!`);
  }

  protected makeSound(): string {
    return "barks: Woof!";
  }
}