// timer.js 
setImmediate(()=>{
  console.log("setImmediate")
});

setTimeout(()=>{
  console.log("setTimeout 0")
},0);

setTimeout(()=>{
  console.log("setTimeout 100")
},100);

process.nextTick(()=>{
    console.log("nextTick")
    process.nextTick(()=>{
        console.log("nextTick inner")
    })
});