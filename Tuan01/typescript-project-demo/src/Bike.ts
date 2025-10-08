import { Vehicle } from "./Vehicle";

export class Bike implements Vehicle {
  brand: string;
  type: string;

  constructor(brand: string, type = "road") {
    this.brand = brand;
    this.type = type;
  }

  start(): void {
    console.log(`${this.brand} bike started.`);
  }

  stop(): void {
    console.log(`${this.brand} bike stopped.`);
  }

  getInfo(): string {
    return `Brand: ${this.brand}, Type: ${this.type}`;
  }
}
