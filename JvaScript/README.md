# JavaScript Practice Notes

এই প্রজেক্টটা `script.js`-এ রাখা JavaScript practice examples, ছোট ছোট notes, আর console-based experiments-এর summary। বেশিরভাগ code block comment করা আছে, তাই যেটা practice করতে চান সেটা uncomment করে browser console-এ run করা যাবে।

## ফাইল স্ট্রাকচার
- `index.html`: basic page structure, আর কিছু DOM practice element comment করা আছে
- `style.css`: simple styling
- `script.js`: topic-wise JavaScript practice code
- `index.json`: fetch practice করার sample data file
- `README.md`: `script.js`-এর updated explanation

## কীভাবে ব্যবহার করবেন
- `index.html` browser-এ open করুন
- DevTools console খুলুন
- `script.js` থেকে একটি section uncomment করে run করুন
- DOM example run করতে চাইলে দরকারি HTML-ও `index.html` থেকে uncomment করুন

## কভার করা টপিক

### ১) Hello World
- `console.log()` দিয়ে basic output print করার example আছে

```js
console.log("Hello Word")
console.log("i Love You")
```

### ২) Data Types
- Primitive type: `String`, `Number`, `Boolean`, `Undefined`, `Null`, `BigInt`, `Symbol`
- Reference type: `Object`, `Array`, `Function`, `Date`, `RegExp`, `Map`, `Set`
- `typeof` দিয়ে type check দেখানো হয়েছে

### ৩) Variables
- `var`: re-declare ও update করা যায়
- `let`: update করা যায়, re-declare করা যায় না
- `const`: re-declare বা update করা যায় না
- block scope বনাম global scope নিয়ে notes আছে

### ৪) Object
- object তৈরি, property read/update, dot notation, bracket notation
- নতুন property add করার example আছে

```js
const user = {
  name: "Rokey",
  age: 19
}

console.log(user.name)
console.log(user["age"])
```

### ৫) Operators
- Arithmetic: `+`, `-`, `*`, `/`, `%`, `**`
- Unary: `++`, `--`
- Assignment: `=`, `+=`, `-=`, `*=`, `%=` , `**=`
- Comparison: `==`, `===`, `!=`, `!==`, `>`, `>=`, `<`, `<=`
- Logical: `&&`, `||`, `!`

### ৬) Conditional Statements
- `if...else`
- ternary operator
- `switch`
- `prompt()` use করে simple decision-making example

### ৭) Loops
- `for`
- `while`
- `do...while`
- `for...of`
- `for...in`
- even number print, sum calculation, আর number guessing style practice আছে

### ৮) String ও Template Literal
- string length
- index access
- template literal দিয়ে dynamic output
- escape character `\n` এবং `\t`

```js
let name = "Rokey"
console.log(`My name is ${name}`)
```

### ৯) String Methods
- `toUpperCase()`
- `toLowerCase()`
- `trim()`
- `slice()`
- `concat()`
- `replace()`
- `replaceAll()`
- `charAt()`
- `includes()`

### ১০) Array
- array create, read, update
- loop দিয়ে array iterate করা
- basic average/discount related practice note আছে

### ১১) Array Methods
- `push()`
- `pop()`
- `toString()`
- `join()`
- `concat()`
- `shift()`
- `unshift()`
- `slice()`
- `splice()`
- `delete`

### ১২) Function
- normal function
- arrow function
- parameter pass করা
- return value
- vowel counting-এর example আছে

```js
function add(a, b) {
  return a + b
}

console.log(add(2, 3))
```

### ১৩) Callback Function এবং `forEach()`
- callback function-এর basic idea দেখানো হয়েছে
- `forEach()` দিয়ে array-এর প্রতিটি value handle করা হয়েছে

### ১৪) `map()`, `filter()`, `reduce()`
- `map()` transformed array return করে
- `filter()` condition match করা value return করে
- `reduce()` multiple value combine করে single output দেয়

```js
let nums = [1, 2, 3, 4]

let doubled = nums.map((num) => num * 2)
let even = nums.filter((num) => num % 2 === 0)
let total = nums.reduce((sum, num) => sum + num, 0)
```

### ১৫) Spread Syntax
- spread syntax দিয়ে array copy করা যায়
- object copy করা যায়
- multiple array merge করা যায়
- function argument pass করার সময়ও use করা যায়

```js
let a = [1, 2, 3]
let b = [...a, 4, 5]
console.log(b)
```

### ১৬) Destructuring
- array destructuring
- object destructuring
- selected value variable-এ store করা

```js
let user = { name: "Rokey", age: 19 }
let { name, age } = user
```

### ১৭) Hoisting
- `var` hoist হয়
- `let` এবং `const` temporal dead zone-এ থাকে
- function declaration hoist হয়
- function expression hoist behaviour আলাদা

### ১৮) IIFE
- IIFE মানে Immediately Invoked Function Expression
- function define করার সাথে সাথে run করা যায়
- global scope clean রাখতে help করে

```js
(function () {
  console.log("IIFE run hoise")
})()
```

### ১৯) DOM Practice
- `querySelector()`
- `querySelectorAll()`
- `getElementById()`
- `getElementsByClassName()`
- `getAttribute()` / `setAttribute()`
- `innerHTML`
- `textContent`
- `style`
- `classList.add()` / `classList.remove()`
- `createElement()`, `append()`, `prepend()`, `before()`, `after()`, `remove()`

নোট: এই section-এর অনেক example run করতে হলে `index.html`-এর commented elements আগে uncomment করতে হবে।

### ২০) Events
- `onclick`
- `addEventListener()`
- `removeEventListener()`
- event bubbling related practice file আছে
- button disable/style change example

### ২১) LocalStorage
- `setItem()`
- `getItem()`
- `removeItem()`
- `clear()`
- string data save করা
- `JSON.stringify()` / `JSON.parse()` use করে object store করা

### ২২) Prototype ও Class
- object method
- `this`
- `__proto__`
- ES6 `class`
- `constructor`
- `new` keyword দিয়ে object create করা

### ২৩) Error Handling
- invalid input detect করা
- `throw` দিয়ে custom error দেওয়া
- `try...catch`
- `finally`
- runtime problem handle করার basic example আছে

```js
try {
  let num = Number("abc")

  if (isNaN(num)) {
    throw new Error("Invalid number")
  }
} catch (error) {
  console.log(error.message)
} finally {
  console.log("Done")
}
```

### ২৪) Promise কী
- `Promise` হলো future-এ কোন কাজ success হবে নাকি fail হবে, সেটা handle করার JavaScript way
- এটা mainly asynchronous কাজের জন্য use হয়
- Promise-এর তিনটা state আছে: `pending`, `fulfilled`, `rejected`

```js
let promise = new Promise((resolve, reject) => {
  let success = true

  if (success) {
    resolve("Kaaj hoise")
  } else {
    reject("Kaaj fail")
  }
})

promise
  .then((result) => console.log(result))
  .catch((error) => console.log(error))
```

### ২৫) Promise কেন দরকার
- server থেকে data আনতে
- delay handle করতে
- API call manage করতে
- callback hell কমাতে

### ২৬) Promise Methods
- `Promise.all()`
- `Promise.race()`
- `Promise.allSettled()`
- `Promise.any()`

### ২৭) Async JavaScript
- `setTimeout()`
- callback nesting নিয়ে short note
- `Promise`
- `.then()` / `.catch()`
- `async` / `await`
- delay helper function দিয়ে message print করার example

### ২৮) Fetch API কীভাবে কাজ করে
- `fetch()` browser-এর built-in function
- এটা server বা file থেকে data আনতে use হয়
- `fetch()` একটি Promise return করে
- response পাওয়ার পর `.json()` দিয়ে data readable object/array বানানো হয়

```js
fetch("index.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
  })
  .catch((error) => {
    console.log("Error:", error)
  })
```

### ২৯) `async` / `await` দিয়ে Fetch API
- `async` function-এর ভিতরে `await` use করলে code দেখতে sync-এর মতো simple লাগে
- error handle করার জন্য `try...catch` use করা হয়

```js
async function loadData() {
  try {
    const response = await fetch("index.json")
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.log("Data load failed", error)
  }
}

loadData()
```

### ৩০) JSON
- `JSON.stringify()` দিয়ে object থেকে JSON string বানানো যায়
- `JSON.parse()` দিয়ে JSON string থেকে object বানানো যায়
- localStorage আর API data handle করার জন্য important

```js
let user = { name: "Rokey", age: 19 }
let jsonData = JSON.stringify(user)
let normalData = JSON.parse(jsonData)
```

### ৩১) Frontend-এ API data add কীভাবে করে
- প্রথমে HTML-এ একটা container রাখা হয়
- তারপর JavaScript দিয়ে `fetch()` করে data আনা হয়
- loop চালিয়ে প্রতিটি item HTML-এ show করা হয়
- সাধারণভাবে `innerHTML`, `createElement()`, `append()` use করা হয়

```js
async function showUsers() {
  const box = document.querySelector(".users")

  try {
    const response = await fetch("index.json")
    const users = await response.json()

    users.forEach((user) => {
      box.innerHTML += `
        <div>
          <h3>${user.name}</h3>
          <p>Age: ${user.age}</p>
        </div>
      `
    })
  } catch (error) {
    console.log(error)
  }
}
```

### ৩২) JavaScript-এ আর যেসব important topic জানা দরকার
- `Set`
- `Map`
- `Date`
- `Math`
- closures
- recursion
- `this` keyword deep dive
- optional chaining `?.`
- nullish coalescing `??`

### ৩৩) Error handling করার সময় কী কী মাথায় রাখবেন
- user input validate করতে হবে
- number conversion-এর পরে `isNaN()` check দিতে হবে
- async code-এ `try...catch` use করতে হবে
- promise-এ `.catch()` রাখা ভালো
- DOM element select করার পরে null check দিলে error কমে
- API response fail করলে readable message show করা উচিত

### ৩৪) Portfolio project-এ এই topic গুলো কীভাবে add করা যায়
- `About Me` section-এর data JSON থেকে load করা যায়
- `Projects` section local JSON থেকে দেখানো যায়
- `Skills` list dynamic ভাবে render করা যায়
- `Contact` form submit করার আগে validation করা যায়
- fetch করে external data UI-তে show করা যায়
```


// callback example


function greet(name, callback) {
    console.log("Hello " + name);
    callback(); // পরে এই function টা চালানো হচ্ছে
}

function sayBye() {
    console.log("Bye!");
}

greet("Rokey", sayBye);








// callback hell example


setTimeout(() => {
    console.log("Step 1");

    setTimeout(() => {
        console.log("Step 2");

        setTimeout(() => {
            console.log("Step 3");
        }, 1000);

    }, 1000);

}, 1000);








// Promise example



const myPromise = new Promise((resolve, reject) => {
    let success = true;

    if (success) {
        resolve("Done!");
    } else {
        reject("Error!");
    }
});


myPromise
    .then((result) => {
        console.log(result);
        return "profile data"; // 👈 return দিতে হবে
    })
    .then((result) => {
        console.log(result);
        return "post data";
    })
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });







// Promise example all any race   


const p1 = Promise.resolve("A");
const p2 = Promise.resolve("B");
const p3 = Promise.resolve("C");


Promise.all([p1, p2, p3]).then((res) => {           //  all → সব data লাগবে (profile + post + comment)
    console.log("ALL:", res);
});


Promise.any([p1, p2, p3]).then((res) => {            // any → যেকোনো server কাজ করলেই হবে
    console.log("ANY:", res);
});


Promise.race([p1, p2, p3]).then((res) => {           // race → fastest server যেটা দিবে সেটাই নিবি
    console.log("RACE:", res);
});









// fetch api in javascript


async function getData() {

let x = await fetch('index.json')

let data = await x.json()

console.log(data) 

}

getData()


// Example POST method implementation:

async function postData(url = "", data = {}) {

}

// Default options are marked with *

const response = await fetch(url, {

method: "POST", // *GET, POST, PUT, DELETE, etc.

mode: "cors", // no-cors, *cors, same-origin

cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached

credentials: "same-origin", // include, *same-origin, omit

headers: {

"Content-Type": "application/json",

// 'Content-Type': 'application/x-www-form-urlencoded',

},

redirect: "follow", // manual, *follow, error

referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-orig

body: JSON.stringify(data), // body data type must match "Content-Type" header

});

return response.json(); // parses JSON response into native JavaScript objects

postData("https://example.com/answer", { answer: 42}).then((data) => {

console.log(data); // JSON data parsed by `data.json()` call

});


```
