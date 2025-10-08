import { Appliance } from "./Appliance";

export class Fan extends Appliance {
  speed: number;

  constructor(name: string, speed = 1) {
    super(name);
    this.speed = speed;
  }

  turnOn(): void {
    console.log(`${this.name} fan is ON at speed ${this.speed}`);
  }
}
