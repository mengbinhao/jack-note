// function someAsyncWork() {
//   setTimeout(() => {
//     console.log(111111111);
//   }, 1000);
// }
// async function doLog(work) {
//   const logs = [];
//   await work(log => logs.push(log));
//   console.log(logs);
// }

// async function work1(log) {
//   await someAsyncWork();
//   log(1);
// }

// async function work2(log) {
//   await someAsyncWork();
//   log(2);
// }

// // log [1, 2]
// doLog(async log => {
//   await work1(log);
//   await work2(log);
// });


//promise.all version
function someAsyncWork() {
	setTimeout(() => {
			console.log(111111111)
	}, 1000)
}

async function work1 (log) {
await someAsyncWork()
log(1)
}

async function work2 (log) {
await someAsyncWork()
log(2)
}


async function doLog (...works) {
const allLogs = works.map(() => [])
await Promise.all(
 works.map((work, index) => work(log => allLogs[index].push(log)))
)
console.log([].concat.apply([], allLogs))
}

// log [1, 2]
doLog(work1, work2)
