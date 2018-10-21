let c = 0

let printIt = () => {
    console.log(c);
}

let plus = (callback) => {
    setTimeout(() => {
        c += 1
        callback.call(undefined)
    }, 1000)
}

plus(printIt)
