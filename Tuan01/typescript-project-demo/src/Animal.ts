export abstract class Animal {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    // subclasses must implement how they make a sound
    abstract sound(): void;
}
