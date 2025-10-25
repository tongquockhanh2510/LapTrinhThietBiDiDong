"use strict";
function hello(name) {
    return `Hello, ${name}!`;
}
const helloAsync = new Promise((resolve) => {
    setTimeout(() => resolve("Hello Async"), 2000);
});
async function runAsync() {
    const result = await helloAsync;
    console.log(result);
}
function getTenAsync() {
    return new Promise((resolve) => {
        setTimeout(() => resolve(10), 1000);
    });
}
async function runNumberAsync() {
    const num = await getTenAsync();
    console.log(num);
}
function rejectAfter1Second() {
    return new Promise((_resolve, reject) => {
        setTimeout(() => {
            reject(new Error("Something went wrong"));
        }, 1000);
    });
}
async function runRejectAsync() {
    try {
        await rejectAfter1Second();
    }
    catch (err) {
        console.error(err.message);
    }
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
function simulateTask(time, message) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(message);
        }, time);
    });
}
const tasks1 = simulateTask(2000, "Task 1 done");
const tasks2 = simulateTask(1500, "Task 2 done");
const tasks3 = simulateTask(1000, "Task 3 done");
// Promise.all([tasks1, tasks2, tasks3])
//     .then((results) => {
//         console.log("All tasks completed");
//         console.log(results);
//     }).catch((err) => {
//         console.error("One of the tasks failed");
//         console.error((err as Error).message);
//     });
Promise.race([tasks1, tasks2, tasks3])
    .then((firstResult) => {
    console.log("First task completed");
    console.log(firstResult);
})
    .catch((err) => {
    console.error("All tasks failed");
    console.error(err.message);
});
const promiseChain = Promise.resolve(2)
    .then((num) => {
    console.log("Start with:", num);
    return num * num;
})
    .then((squanred) => {
    console.log("Squared:", squanred);
    return squanred + 3;
})
    .then((double) => {
    console.log("after doubling:", double);
    return double * 2;
})
    .then((finalResult) => {
    console.log("Final result:", finalResult);
})
    .catch((err) => {
    console.error("Error in promise chain:", err.message);
});
function filterNumbers(arr) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!Array.isArray(arr)) {
                reject("Input is not an array");
            }
            else {
                const evenNumbers = arr.filter(num => num % 2 === 0);
                resolve(evenNumbers);
            }
        }, 1000);
    });
}
filterNumbers([1, 2, 3, 4, 5, 6])
    .then((evenNumbers) => console.log("Even numbers:", evenNumbers))
    .catch((err) => console.error("Error:", err));
const myPromise = new Promise((resolve, reject) => {
    const success = Math.random() > 0.5;
    setTimeout(() => {
        if (success) {
            resolve("Task completed successfuly");
        }
        else {
            reject("Task failed");
        }
    }, 1000);
});
// myPromise
//     .then(result => console.log("Success:", result))
//     .catch(err => console.error("Error:", err))
//     .finally(()=> console.log("Done"));
// runAsync();
async function asyncSimulateTask() {
    const result = await simulate(2000);
    console.log(result);
}
// asyncSimulateTask();
async function runAsyncWithError() {
    try {
        const message = await getRandomNumber();
        console.log("success", message);
    }
    catch (error) {
        console.error("Error", error);
    }
    finally {
        console.log("Done");
    }
}
// runAsyncWithError();
async function takeNumber1Second(so) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(so * 3);
        }, 1000);
    });
}
async function run14() {
    const result14 = await takeNumber1Second(5);
    console.log(result14);
}
// run14();
async function task(name, time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`${name} complete`);
        }, time);
    });
}
async function runMutilTask() {
    const result1 = await task("task1", 1000);
    console.log(result1);
    const result2 = await task("task2", 1000);
    console.log(result2);
    const result3 = await task("task3", 1000);
    console.log(result3);
    const result4 = await task("task4", 1000);
    console.log(result4);
}
// runMutilTask()
async function runParallelTasks() {
    const tasks = await Promise.all([
        task("task1", 1000),
        task("task2", 1500),
        task("task3", 100),
    ]);
    for await (const result of tasks) {
        console.log(result);
    }
}
// runParallelTasks()
async function fetchUser(id) {
    const randomDelay = Math.random() * 3000;
    const apiCall = new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id, name: `User_${id}` });
        }, randomDelay);
    });
    const timeout = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Request  time out")), 2000);
    });
    return Promise.race([apiCall, timeout]);
}
// (async ()=>{
//     const user = await fetchUser(1);
//     console.log(user);
// })();
async function fetchUsers(ids) {
    const promises = ids.map(id => fetchUser(id));
    const users = await Promise.all(promises);
    return users;
}
// (async ()=>{
//     const result = await fetchUsers([1,2,3])
//     console.log(result);
// })();
(async () => {
    try {
        const user = await fetchUser(1);
        console.log(" User:", user);
    }
    catch (err) {
        console.error(" Error:", err.message);
    }
})();
