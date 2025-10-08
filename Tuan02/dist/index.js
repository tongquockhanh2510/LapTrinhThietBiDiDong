"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function hello(name) {
    return `Hello, ${name}!`;
}
const helloAsync = new Promise((resolve) => {
    setTimeout(() => resolve("Hello Async"), 2000);
});
function runAsync() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield helloAsync;
        console.log(result);
    });
}
function getTenAsync() {
    return new Promise((resolve) => {
        setTimeout(() => resolve(10), 1000);
    });
}
function runNumberAsync() {
    return __awaiter(this, void 0, void 0, function* () {
        const num = yield getTenAsync();
        console.log(num);
    });
}
function rejectAfter1Second() {
    return new Promise((_resolve, reject) => {
        setTimeout(() => {
            reject(new Error("Something went wrong"));
        }, 1000);
    });
}
function runRejectAsync() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield rejectAfter1Second();
        }
        catch (err) {
            console.error(err.message);
        }
    });
}
function getRandomNumber() {
    return new Promise((resolve, reject) => {
        const num = Math.random();
        setTimeout(() => {
            if (num > 0.5) {
                resolve(num);
            }
            else {
                reject(new Error("Number is less than 0.5"));
            }
        }, 1000);
    });
}
function simulate(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Task done");
        }, time);
    });
}
// runNumberAsync();
// runRejectAsync();
// getRandomNumber()
// .then((num) => console.log(`Random number: ${num}`))
// .catch((err) => console.error((err as Error).message));
// simulate(2000)
//     .then((message)=>console.log(message))
//     .catch((err)=> console.error(err))
const tasks1 = simulate(2000);
const tasks2 = getRandomNumber();
const tasks3 = simulate(1000);
Promise.all([tasks1, tasks2, tasks3])
    .then((results) => {
    console.log("All tasks completed");
    console.log(results);
}).catch((err) => {
    console.error("One of the tasks failed");
    console.error(err.message);
});
