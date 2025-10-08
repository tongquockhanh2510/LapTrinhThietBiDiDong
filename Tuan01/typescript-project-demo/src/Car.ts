import { Vehicle } from "./Vehicle";

export class Car implements Vehicle {
    brand: String;
    model: String;
    year: number;

    constructor(brand: String, model: String, year: number) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }

    showCarInfor() {
        console.log(`Brand : ${this.brand}  Model :${this.model}  Year: ${this.year}`);
    }

    start(): void {
        console.log(`${this.brand} started.`);
    }

    stop(): void {
        console.log(`${this.brand} stopped.`);
    }

    getInfo(): string {
        return `Brand: ${this.brand}, Model: ${this.model}, Year: ${this.year}`;
    }
}