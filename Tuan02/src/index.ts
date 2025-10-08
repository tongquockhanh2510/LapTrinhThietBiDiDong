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