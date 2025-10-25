async function fetchTodo(id : number) {
    try{
        const reponse = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
        if(!reponse.ok){
            throw new Error(`status : ${reponse.status}`);
        }

        const data = await reponse.json();
        console.log(data);
    }catch(error){
        console.error("loi khi fetch ", (error))
    } 
}

async function fetchMultipleTodos() {
    try{
        const ids = [1,2,3];
        const todos = Promise.all(ids.map(id=> fetchTodo(id)));
        console.log(todos);
    }catch(error){
        console.error("loi");
    }
}


async function fetchCompletedTodos() {
    try{
        const response = await fetch("https://jsonplaceholder.typicode.com/todos");
        if(!response.ok){
            throw new Error("khong thanh cong");
        }
        const data = await response.json();
        const completedTodos = data.filter((tode:any)=>  tode.completed);

        console.log(completedTodos);
    }
    catch (error) {
    console.error("❌ Lỗi:", (error as Error).message);
  }
    
}
// fetchCompletedTodos();


async function postData(url='', data ={}) {
    try{
        const response = await fetch(url,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body :  JSON.stringify(data)
        });


        if(!response.ok){
            throw new Error("khong thanh cong");
        }
        const result = await response.json();
        console.log('Succes', result);
        return result;
    }     catch (error) {
    console.error('Error:', error);
  }
}

// postData("https://jsonplaceholder.typicode.com/posts",{
//     title:'Hello World',
//     body:'This is a test post.',
//     userId: 1
// })


function downLoadFile(){
    return new Promise((resolve)=>{
        console.log('DownLoad file..');
        setTimeout(()=>{
            resolve('download complete');
        },3000);
    });
}

async function rundownLoad() {
    const message = await downLoadFile();
    console.log(message);
    
}
// rundownLoad()

async function waitFiveSeconds() {
  console.log('Waiting for 5 seconds...');
  await new Promise((resolve) => setTimeout(resolve, 5000));

  console.log('Done waiting!');
}

// waitFiveSeconds();

async function fetchWithRetry(url : string, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data; // Success, return data

    } catch (error) {
      console.warn(`Attempt ${attempt} failed: `);

      if (attempt === retries) {
        throw new Error(`All ${retries} attempts failed.`);
      }

     
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}

// fetchWithRetry('https://jsonplaceholder.typicode.com/todos/1', 3)
//   .then(data => console.log('Data received:', data))
//   .catch(error => console.error('Final error:', error));


// Example async task function
async function asyncTask(id :number, delay: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Task ${id} completed`);
      resolve(`Result of task ${id}`);
    }, delay);
  });
}

async function batchProcess() {
  const tasks = [
    asyncTask(1, 1000),
    asyncTask(2, 2000),
    asyncTask(3, 1500),
    asyncTask(4, 2500),
    asyncTask(5, 1200)
  ];
  const results = await Promise.all(tasks);

  console.log('All tasks completed:', results);
}


// Function to process tasks sequentially
async function queueProcess(tasks: any) {
  const results = [];

  for (const task of tasks) {
    const result = await task(); // Wait for each task to complete
    results.push(result);
  }

  console.log('All tasks processed sequentially:', results);
  return results;
}

// Example usage
const tasksQueue = [
  () => asyncTask(1, 1000),
  () => asyncTask(2, 1500),
  () => asyncTask(3, 1200),
  () => asyncTask(4, 2000),
  () => asyncTask(5, 800)
];

// queueProcess(tasksQueue);
if (!Promise.allSettled) {
  (Promise as any).allSettled = function <T>(
    promises: Promise<T>[]
  ): Promise<
    Array<{ status: 'fulfilled'; value: T } | { status: 'rejected'; reason: any }>
  > {
    return Promise.all(
      promises.map(p =>
        p.then(
          (value: T) => ({ status: 'fulfilled' as const, value }),
          (reason: any) => ({ status: 'rejected' as const, reason })
        )
      )
    );
  };
}


function fakeFetch(url: any) {
  return new Promise((resolve, reject) => {
    const delay = Math.floor(Math.random() * 2000) + 500; 
    setTimeout(() => {
      if (Math.random() > 0.5) { 
        resolve({ url, data: `Data from ${url}` });
      } else {
        reject(`Error fetching ${url}`);
      }
    }, delay);
  });
}

// Hàm xử lý nhiều API calls
async function handleMultipleAPIs() {
  const urls = ['api/1', 'api/2', 'api/3', 'api/4', 'api/5'];

  const promises = urls.map(url => fakeFetch(url));

  const results = await Promise.allSettled(promises);

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      console.log(`API ${index + 1} succeeded:`, result.value);
    } else {
      console.log(`API ${index + 1} failed:`, result.reason);
    }
  });
}

// Chạy thử
handleMultipleAPIs();


