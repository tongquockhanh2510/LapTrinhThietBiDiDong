import { Employee } from "./Employee";

export class Developer extends Employee {
  language: string;

  constructor(name: string, salary: number, language = "TypeScript") {
    super(name, salary);
    this.language = language;
  }

  writeCode(): void {
    console.log(`${this.name} is writing ${this.language} code.`);
  }

  debug(): void {
    console.log(`${this.name} is debugging ${this.language} code.`);
  }
}
