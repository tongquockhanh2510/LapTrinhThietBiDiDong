export class Person{
    name : String;
    age : number;

    constructor (name: String, age: number){
        this.name = name;
        this.age = age;
    }
    displayInfo(): void{
        console.log(`Name: ${this.name} Age: ${this.age}`)
    }

   

}
