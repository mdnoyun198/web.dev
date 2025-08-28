

let [x, y, z] = [1,2,3];

console.log(x, y, z);

let [a,b,...rest] = [1,2,3,4,5,6,]

console.log(a, b, rest);



// let numbers = [10, 20, 30];

// // সাধারনভাবে
// let a = numbers[0];
// let b = numbers[1];

// // destructuring
// let [x, y, z] = numbers;

// console.log(x, y, z); // 10 20 30


let objicet = {
    e: 1,
    f: 2,
    g: 3,
}

let {e} = objicet

console.log(e)