import { Swimmable } from "./Swimmable";

export class Fish implements Swimmable {
  swim(): void {
    console.log("The fish is swimming in the water ");
  }
}