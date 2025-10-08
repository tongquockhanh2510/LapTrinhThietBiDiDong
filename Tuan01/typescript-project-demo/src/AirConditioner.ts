import { Appliance } from "./Appliance";

export class AirConditioner extends Appliance {
  temperature: number;

  constructor(name: string, temperature = 24) {
    super(name);
    this.temperature = temperature;
  }

  turnOn(): void {
    console.log(`${this.name} AC is ON set to ${this.temperature}°C`);
  }
}
