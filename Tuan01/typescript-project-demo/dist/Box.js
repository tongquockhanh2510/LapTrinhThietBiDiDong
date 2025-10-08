"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Box = void 0;
class Box {
    constructor(value) {
        this.value = value;
    }
    get() {
        return this.value;
    }
    set(value) {
        this.value = value;
    }
}
exports.Box = Box;
