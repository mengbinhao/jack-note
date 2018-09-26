//值类型数据 唯一的
let sym = Symbol();
//console.log(typeof sym);

let sym2 = Symbol("test symbol description");
//console.log(sym2);
//console.log(sym2.toString());
//console.log(String(sym2));
//console.log(Boolean(sym2));

//Symbol.for("xxx")
//console.log(Symbol.for("bar") === Symbol.for("bar"));
//console.log(Symbol("bar") === Symbol("bar"));
//Sysmbol.keyFor(xxx);

//11个内置Symbol