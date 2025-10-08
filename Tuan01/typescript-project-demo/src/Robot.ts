import { Movable } from "./Movable";

export class Robot implements Movable {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  move(distance: number): void {
    console.log(`Robot ${this.id} moves ${distance} meters.`);
  }
}
