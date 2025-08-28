function sum(a, b, c) {
    return a + b + c

}

let arr = [1,4,6]
console.log(sum(...arr))


console.log(arr[0] + arr[1] + arr[2])



let str = "Hi";
let chars = [...str];

console.log(chars); // ["H", "i"]




// let arr1 = [1, 2, 3];
// let arr2 = [4, 5];

// // normal join
// let all = arr1.concat(arr2);

// // spread দিয়ে
// let all2 = [...arr1, ...arr2];

// console.log(all2); // [1,2,3,4,5]
