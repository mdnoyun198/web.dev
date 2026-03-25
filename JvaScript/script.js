
// console.log(a++)
// console.log(++a)
// a++
// console.log(a)
// a--
// console.log(a)



// Assignment Operators = += -= *= %= **=


// let a = 2
// let b = 2

// a += 1
// console.log(a+1)



// Comparison Operators  true or false

// Equal to ==

// Equal to & type ===

// Not equal to !=

// Not equal to & type != !==

//  >  >=  <  <=

// let a = 3
// let b = 2

// // let a = "hello im sokey"
// // let b = "hello im rokey"

// // console.log(a == b)
// // console.log(a === b)
// // console.log(a != b)
// // console.log(a !== b)

// console.log(a>b)

// console.log(a>=b)  //a বড় বা সমান কি

// console.log(a<b)

// console.log(a<=b) //a ছোট বা সমান কি



// Logical Operators

// Logical AND    &&

// Logical OR     ||

// Logical NOT    !

// let a = 2
// let b = 2

// // let con1 = a == b

// // console.log(con1)

// // let con2 = a === b

// // console.log(con2)

// // console.log(con1 && con2)

// // console.log(con1 || con2)

// // // Logical NOT    !

// console.log(!(a==b))



// Conditional Statements

// To implement some condition in the code

/*
const age = prompt("enter your age")

console.log(age)

if (age >= 18) {

    console.log("your reday to sex")

} else {

    console.log("your not redey to sex")

}
    */



// Ternary Operators   a ? b : c

/*
let age = prompt("enter your age")

console.log(age >= 18 ? "adult" : "not adult")
*/


// switch Operators
/*
const expr = "Papayas";

switch (expr) {
  case "Oranges":
    console.log("Oranges are $0.59 a pound.");
    break;
  case "Mangoes":
  case "Papayas":
    console.log("Mangoes and papayas are $2.79 a pound.");
    // Expected output: "Mangoes and papayas are $2.79 a pound."
    break;
  default:
    console.log(`Sorry, we are out of ${expr}.`);

}
*/



// Lopps in javascript

// for loop
/*
for (let i = 0; i < 5000; i++) {

    console.log("i love you")

}
*/

//  Calculate sum Number

/*
let sum = 0;

for (let i = 1; i <= 5; i++) {

    sum = sum + i

}
console.log(sum)


for (let i = 0; i < 5; i++) {

    console.log(i)

}


// While Loops

let i = 0;

while (i <= 5) {

    console.log(i)
    i++
}


let i = 0

do {

    console.log("i love you")

    i++

    console.log(i)

} while (i <= 9);

*/


// For Of Lopps

// let a = "mdrokey"

// for (let i of a) {

//     console.log(i)

// }




// for in loops

// const rokey = {

//     Name: "mdrokey",

//     age: 19,

//     isPass: true

// }

// for (let i in rokey){

//     console.log(i, rokey[i])

// }


/*for (let n = 1; n <= 100; n++) {

    if (n % 2 === 0) {

        console.log(n)

    }

}

*/

/*

let gameNum = 25

let userNum = prompt("guess a number")

while (gameNum != userNum) {

    userNum = prompt("rong  number")

} console.log("congratualtions")

*/


// String in JavaScript  // let str = "hello" str.length  str[0],str[1]
/*
let str1 = "hello1"

let str2 = `hello2`

console.log(str1.length)
console.log(str2[0], str2[1], str2[2])
*/

// Templet Literals
/*
let text = `The is a Templet `

console.log(text)

let tx = 20

let rokey = {
    Name: "Rokey",
    Class: 12,
    Price: 200
}

console.log(`my name is ${rokey.Name} im in class ${rokey.Class} my student fee${10 + rokey.Price + tx}`)
*/

// Skep Crature //  \n and \t
/*
let a = "Hello \n Word \t Rokey"

console.log(a.length)
*/



// String Method
/*
let str = "ABcdeFg"

str = str.toUpperCase()

console.log(str)

console.log(str.toUpperCase())

console.log(str.toLowerCase())

let str1 = "    Hello   Hi      im     "

console.log(str1.trim())

console.log(str.slice(0,5))

console.log(str.concat(str1.trim()))

console.log(str.replace("A", "X"))
console.log(str.replaceAll())

console.log(str.charAt(0))


let text = "Hello"

console.log(text.includes("e"))
*/



// Array in JavaScript

// collstion of item

/*
let arr = [1,2,3,4,5,6,7,8,9,10,11,12]

console.log(arr)

console.log(typeof arr)

console.log(arr[0], arr[5], arr[100])

arr[0] = 333

console.log(arr[0], arr[5], arr[100])
*/

// Lopping Over in Array

// let arr = ["Rokey","Noyun","Israt","Robin" ]

// console.log(arr[0],arr)


// for loop
/*
for (let index = 0; index < arr.length; index++) {

    console.log(arr[index]) ;
    
}
*/


// for of
/*
for (const element of arr) {
    
    console.log(element.toUpperCase())

}
*/


// let mark = [33, 44, 55, 66, 77]

// let sum = 0

// for (const element of mark) {
//     sum + element
// }

// let avg = sum / mark.length

// console.log(avg)



// // let price = [100, 200, 300, 400, 50]

// // for (const element of price) {

// //   let discount = element * 10 / 100

// //   let finalPrice = element - discount

// //   console.log(finalPrice)

// // }



// let price = prompt("enter a price")

// let discount = price * 20 / 100

// console.log(discount)

// let finalPrice = price - discount

// console.log(finalPrice) // 90



// Array Method push()  pop() toString() concat() shift()  unshift()  slice() splice()

// const arr = ["Apple", "Banana", "Peynapale"]
// const herro = ["HronMan", "Thor"]
// const modon = ["pagla","bokachuda"]



// arr.shift()
// arr.unshift("hahah")
// console.log(arr)

// console.log(arr.slice(1,2))

// let arr2 = arr.concat(herro,modon)

// console.log(arr2)



// arr.push("kala")


// arr.pop()

// console.log(arr)

// console.log(typeof arr.toString())


// let fruits = ["Apple", "Banana", "Mango"];
// fruits.splice(1, 0, "Orange", "Grapes"); // start=1, delete 0, add 2 items

// console.log(fruits);  // ["Apple", "Orange", "Grapes", "Banana", "Mango"]


// Function in Javascript


/*
function fun(a,b,c) {

   console.log(a+b+c) 

    return
    
}

fun(1,1,1)


// Arrow Function

const fun1 = (a,b)=>{

    console.log(a+b)

    return

}

fun1(12,"hello")

*/



/*
function vowels(str) {

    let count = 0

    for (const element of str.toUpperCase()) {


        if (element === "A" || element === "E" || element === "I" || element === "O" || element === "U") {

            count++

            console.log(element)
        }

    };

    console.log(count)
}

vowels("AEIOU RRa")
*/


// Small version

/*
const  vowels = (str) => {

    let count = 0
    const v = "AEIOU"

    for (const element of str.toUpperCase()) {

        if (v.includes(element)) {
            count++
            console.log(element)
        }

    }

    console.log(count)
}

vowels("AEIOU RRa")
*/

// Function array.forEach Method


// CallbackFunction: Here, it is a function to execute for each element in the array

// *A callback is a function passed as an argument to another function.
/*
let arr = [1, 2, 3, 4, 5]

arr.forEach(function print(val) {

    console.log(val)

})

let str = ["hello", "bye"]

str.forEach((val)=>{

    console.log(val,str)
})


let num = [1, 2, 3, 4, 5, 6, 7]

const collcuter = (num) => {

    console.log(num * 2)

}

num.forEach(collcuter)
*/


// Map Methods
/*
let num = [1, 2, 3, 4, 5, 6, 7]

let newArr = num.map((val) => {

    return val  + 1 ;

})

console.log(newArr)
*/


// Filter Methods
/*
let num = [1, 2, 3, 4, 5, 6, 7, 8]

let evenArr = num.filter((val) => {

    // return val % 2 !== 0;
    return val <= 3

})

console.log(evenArr)
*/

// Reduce Methods
/*
let num = [1, 2, 3, 4]

let sum = num.reduce((acc, val) => {
    return acc + val
}, 0)

console.log(sum)
*/


// let div = document.body.querySelector("div")

// console.log(div.innerHTML)

// div.style.backgroundColor = ("blue");

// div.innerHTML = (`<img src="https://images.unsplash.com/photo-1520209759809-a9bcb6cb3241?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1nfGVufDB8fDB8fHww" alt="" width="100%"> hello`)

// console.log(div.innerHTML)

// let a = document.getElementsByClassName("box")

// console.group(typeof a)


// for (let i = 0; i < a.length; i++) {
//   setTimeout(() => {
//     a[i].style.backgroundColor = "black";
//   }, i * 1000); // 500ms delay per box
// }


// let a = document.querySelector("div")

// console.log(a)

// let b = a.getAttribute("name")

// console.log(b)



// setTimeout(() => {

//     a.setAttribute("class", "tt")

// }, 5000);


// let btn = document.createElement("button")
// btn.style.backgroundColor = ("blue")
// btn.innerText = ("click me")

// let div = document.querySelector("div")

// div.append(btn)
// div.prepend(btn)
// div.before(btn)
// div.after(btn)

// console.log(btn)

// div.remove()


// let p = document.querySelector("p")

// p.style.color = "yellow"

// p.classList.remove("red")
// p.classList.add("green")


let btn = document.querySelector("button")

// let p = document.getElementsByClassName("text")[0];


// function run() {

//     p.innerText = "ClickMe";

// }

// btn.onclick = () => {

//     run()

// }



// btn.onclick = () => {
//     console.log("Hello")
// }
// btn.onclick = () => {
//     console.log("Rokey")
// }


// const hendel = () =>{

//     console.log("Hello")

// }


// btn.addEventListener("click", hendel)


// btn.addEventListener("click", () => {
//     console.log("Rokey")
// })

// btn.removeEventListener("click", hendel)

// btn.disabled = true

// btn.style.backgroundColor = "blue"
// btn.style.color = "black"


// Object and Class and Protype in JavaScript
/*
const stdunt = {
    Name: "Rokey",

    Age: 19,

    Marks: 94.4,

    PintMarks: function () {

        console.log(this.Marks)

    },

    Tex() {
        console.log("Tex is 10%")
    }
}
console.log(stdunt)


const rokey = {
    fee: 5000
}

const rokey2 = {
    fee: 10000,

    Tex() {
        console.log("Tex is 20%")
    }
}

rokey.__proto__ = stdunt
rokey2.__proto__ = stdunt


console.log(rokey.Tex())

console.log(rokey2.Tex())

const arr = [1, 2, 3, 4, 5]



class Car {

    start() {
        console.log("start")
    }
    stop() {
        console.log("top")
    }

}

let vipcar = new Car();


console.log(vipcar)
*/







// Callbacks, Promises & Async Await



/*
console.log("hello1")

setTimeout(() => {

    console.log("hello2")

}, 4000);  // 5s = 5000ms

console.log("hello3")



function hello() {

    console.log("Hello Rokey")

}

setTimeout(hello, 5000)




// Nesting

let age = 14

if (age >= 18) {

    if (age > 40) {

        console.log("senior")

    } else {

        console.log("yor a adult")

    }
} else {

    console.log("yur a clied")

}
*/

// callback Hell or nestig


// Promise 

// let promise1 = new Promise((resolve, reject) => {

// resolve("Dan")


// })

// console.log(promise1)



// let promise2 = new Promise((resolve, reject) => {

// reject("sorry eorr")


// })

// console.log(promise2)


// resolve = .then() reject = .catch()

/*

let promise = new Promise((resolve, reject) => {

    let success = false; // change to false হলে reject হবে

    if (success) {

        resolve("Kaaj hoise 😎");  // success → .then() এ যাবে

    } else {

        reject("Kaaj fail 😢");    // fail → .catch() এ যাবে
    }
});

// Promise handle করা

promise

    .then(result => console.log("Then:", result))  // resolve হলে

    .catch(error => console.log("Catch:", error)); // reject হলে

console.log(promise)
*/

/*
// A helper function that returns a Promise that resolves after `ms` milliseconds
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function printMessages() {
  console.log("hello1");            // print immediately
  await delay(4000);                 // wait 4 seconds
  console.log("hello2");            // print after 4 seconds
  console.log("hello3");            // print immediately after hello2
}

printMessages();

*/




// fetch API

// res

// The Fetch API provides an interface for fetching (sending/receiving) resources.

// It uses Request and Response objects.

// The fetch() method is used to fetch a resource (data).

// let promise = fetch(url, [options])


/*
let url = `index.json`


const getdata = async ()=>{

let rsponse = await fetch(url)

console.log(rsponse)

let data = await rsponse.json()

console.log(data)

}

getdata()

*/

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods


const profileBox = document.querySelector(".profile-box");

async function loadProfiles() {
  try {
    const response = await fetch("index.json");
    const profiles = await response.json();

    if (!Array.isArray(profiles) || profiles.length === 0) {
      profileBox.innerHTML = "<p>No profile data found.</p>";
      return;
    }

    // Turn the existing profile area into a simple scrollable list of cards.
    profileBox.style.width = "320px";
    profileBox.style.maxHeight = "80vh";
    profileBox.style.overflowY = "auto";
    profileBox.style.textAlign = "left";

    profileBox.innerHTML = profiles
      .map(
        (profile) => `
          <div style="padding: 14px 0; border-bottom: 1px solid #e5e5e5; text-align: center;">
            <img src="${profile.picture}" alt="${profile.name} picture">
            <h2>${profile.name}</h2>
            <p>Age: ${profile.age}</p>
          </div>
        `
      )
      .join("");
  } catch (error) {
    console.error("Profile data failed to load:", error);
    profileBox.innerHTML = "<p>Profile data failed to load.</p>";
  }
}

loadProfiles();