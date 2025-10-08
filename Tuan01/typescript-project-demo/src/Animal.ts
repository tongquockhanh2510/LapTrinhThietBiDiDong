export class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  // protected method intended to be overridden by subclasses
  protected makeSound(): string {
    return "makes a sound.";
  }

  speak(): void {
    console.log(`${this.name} ${this.makeSound()}`);
  }
}