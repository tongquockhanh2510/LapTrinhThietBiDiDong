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

function rejectAfter1Second() :Promise<void>{
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

function getRandomNumber(): Promise<number>{
    return new Promise((resolve, reject)=>{
        const num = Math.random();
        setTimeout(()=>{
            if(num> 0.5){
                resolve(num);
            } else {
                reject(new Error("Number is less than 0.5"));
            }
        },1000);
    });
}

function simulate(time: number) : Promise<String>{
    return new Promise((resolve)=>{
        setTimeout(()=>{
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

const tasks1 = simulate(2000);
const tasks2 = getRandomNumber();
const tasks3 = simulate(1000);

Promise.all([tasks1, tasks2, tasks3])
.then((results) => {
    console.log("All tasks completed");
    console.log(results);
}).catch((err) => {
    console.error("One of the tasks failed");
    console.error((err as Error).message);
});