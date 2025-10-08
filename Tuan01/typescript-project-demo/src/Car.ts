import { Vehicle } from "./Vehicle";
import { Movable } from "./Movable";

export class Car implements Vehicle, Movable {
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

    move(distance: number): void {
        console.log(`${this.brand} moved ${distance} meters.`);
    }
}