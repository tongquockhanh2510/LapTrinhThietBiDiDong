export abstract class Appliance {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  abstract turnOn(): void;
}
