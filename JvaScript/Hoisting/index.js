
console.log(5+a)

// console.log(5+b)



var a = 5

let b = 6



// সংক্ষেপে:

// var → hoist হয়, কিন্তু value undefined থাকে।

// let/const → hoist হয়, কিন্তু use করলে error (TDZ এর কারণে)।

// function declaration → পুরো ফাংশন hoist হয়।

// function expression/arrow function → hoist হয় না।