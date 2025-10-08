import { Person } from "./Person";

export class Teacher extends Person {
  subject: string;

  constructor(name: String, age: number, subject: string) {
    super(name, age);
    this.subject = subject;
  }

  introduce(): void {
    console.log(`Hello, I'm ${this.name}, I teach ${this.subject}.`);
  }
}
