/**
 * @description sigleton pattern
 * @param {function} callback
 * @returns sigleton object
 */
let singleton = function (fn) {
    let result;
    return function () {
        return result || (result = fn.apply(this, arguments));
    }
}

let createMask = singleton(function () {
    return document.body.appendChild(document.createElement('div'));
})
//console.log(createMask() === createMask());