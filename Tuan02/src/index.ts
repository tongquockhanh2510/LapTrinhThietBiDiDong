function hello(name: string): string {
  return `Hello, ${name}!`;
}


console.log(hello("200Lab"));


const helloAsync: Promise<string> = new Promise((resolve) => {
  setTimeout(() => resolve("Hello Async"), 2000);
});

async function runAsync() {
  const result = await helloAsync;
  console.log(result);
}

runAsync();


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
    // Log only the error message to show the rejection
    console.error((err as Error).message);
  }
}

runNumberAsync();
runRejectAsync();