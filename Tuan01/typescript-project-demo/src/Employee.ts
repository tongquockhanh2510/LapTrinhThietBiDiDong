export class Employee {
  name: string;
  salary: number;

  constructor(name: string, salary: number) {
    this.name = name;
    this.salary = salary;
  }

  getInfo(): string {
    return `Employee: ${this.name}, Salary: ${this.salary}`;
  }

  raise(amount: number): void {
    this.salary += amount;
  }
}
