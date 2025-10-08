import { Employee } from "./Employee";

export class Manager extends Employee {
  teamSize: number;

  constructor(name: string, salary: number, teamSize = 0) {
    super(name, salary);
    this.teamSize = teamSize;
  }

  manage(): void {
    console.log(`${this.name} is managing a team of ${this.teamSize}`);
  }

  addBonus(amount: number): void {
    console.log(`${this.name} received a bonus of ${amount}`);
    this.raise(amount);
  }
}
