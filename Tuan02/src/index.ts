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

// Returns a Promise that resolves with the number 10 after 1 second
function getTenAsync(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(10), 1000);
  });
}

// Small runner to verify the Promise
async function runNumberAsync() {
  const num = await getTenAsync();
  console.log(num);
}

runNumberAsync();