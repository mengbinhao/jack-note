//console.log(global);

//leak to global attribute
bbb = 'bbb';
console.log('bbb is ' + global.bbb);

let ccc = 'ccc';
console.log('ccc is ' + global.ccc);

console.log(__filename);
console.log(__dirname);