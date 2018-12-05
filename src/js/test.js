const objLikeArr = [["name", "Jim"], ["age", 18], ["single", true]];
const fromPairs = pairs => pairs.reduce((res, pair) => ((res[pair[0]] = pair[1]), res), {});
console.log(fromPairs(objLikeArr));
