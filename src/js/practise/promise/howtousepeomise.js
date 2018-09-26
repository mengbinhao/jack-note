console.log(1);
/**
 * 1 一旦决议状态不会再改变
 * 2 决议代码是同步的,但是决议回调是异步的,而且Promise的异步实现比setTimeout的调用时间更早，因为回调决议存在于Event loop的microtask队列中
 * 3 每一个传给then的回调都会执行 所以需要array保存回调
 */
// let packPromise = new Promise((resolve, reject) => {
//     resolve();
//     resolve();
//     reject();
//     reject();
//     console.log(2);
// }).then(() => {
//     console.log(3);
// }, () => {
//     console.log(4);
// })
// console.log(5);


let packPromise2 = new Promise((resolve, reject) => {
    resolve();
    console.log(2);
});

packPromise2.then(() => {
    console.log(33);
});
packPromise2.then(() => {
    console.log(44);
});

