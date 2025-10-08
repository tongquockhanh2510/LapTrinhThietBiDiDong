function hello(name: string): string {
    return `Hello, ${name}!`;
}




const helloAsync: Promise<string> = new Promise((resolve) => {
    setTimeout(() => resolve("Hello Async"), 2000);
});

async function runAsync() {
    const result = await helloAsync;
    console.log(result);
}



function getTenAsync(): Promise<number> {
    return new Promise((resolve) => {
        setTimeout(() => resolve(10), 1000);
    });
}


async function runNumberAsync() {
    const num = await getTenAsync();
    console.log(num);
}

function rejectAfter1Second(): Promise<void> {
    return new Promise((_resolve, reject) => {
        setTimeout(() => {
            reject(new Error("Something went wrong"));
        }, 1000);
    });
}

async function runRejectAsync() {
    try {
        await rejectAfter1Second();
    } catch (err) {
        console.error((err as Error).message);
    }
}

function getRandomNumber(): Promise<number> {
    return new Promise((resolve, reject) => {
        const num = Math.random();
        setTimeout(() => {
            if (num > 0.5) {
                resolve(num);
            } else {
                reject(new Error("Number is less than 0.5"));
            }
        }, 1000);
    });
}

function simulate(time: number): Promise<String> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Task done");
        }, time);
    })
}
// runNumberAsync();
// runRejectAsync();
// getRandomNumber()
// .then((num) => console.log(`Random number: ${num}`))
// .catch((err) => console.error((err as Error).message));

// simulate(2000)
//     .then((message)=>console.log(message))
//     .catch((err)=> console.error(err))
function simulateTask(time: number, message: string): Promise<String> {
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
            console.error((err as Error).message);
        });
