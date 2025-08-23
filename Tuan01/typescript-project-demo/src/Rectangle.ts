export class Retangle{
    width : number;
    height: number;

    constructor(width: number, height: number){
        this.width = width;
        this.height = height;
    }

     area(): number{
        return this.width * this.height;

    }

    perimeter() :number{
        return (this.height+this.width)* 2
    } 
}