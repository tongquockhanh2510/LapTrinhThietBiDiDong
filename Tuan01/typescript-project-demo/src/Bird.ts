import { Flyable } from "./Flyable";

export class Bird implements Flyable {
  fly(): void {
    console.log("The bird is flying in the sky");
  }
}