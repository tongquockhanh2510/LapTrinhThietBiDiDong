export class Car {
    brand: String;
    model: String;
    year: number;

    constructor(brand: String,
        model: String,
        year: number) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }

    showCarInfor() {
        console.log(`Brand : ${this.brand}  Model :${this.model}  Year: ${this.year}`)
    }
}