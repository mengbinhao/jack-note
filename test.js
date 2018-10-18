var arr = [1,2,3,4,5]


//TODO: need to finish
Array.prototype.mySplice = function(start, delCount, ...rest) {
    let begin = []
    let end = []
    if (!(typeof start === 'number') || Number.isNaN(start) || !Number.isFinite(start) || !Number.isInteger(start)) {
        throw Error('pls pass correct start param')
    }

    
    //not implement negative number
    if (start > this.length) {
        start = this.length
    }

    if (delCount > 0) {
        for (let i = start; i < delCount; i++) {

        }  
    }
    return 2
}

console.log(arr.mySplice(0));