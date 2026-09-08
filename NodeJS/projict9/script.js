

/*
 
    let sname = 'rokey'
 
    let newn
 
    newn = sname[0].toUpperCase()
 
    let l = sname.slice(1)
 
    let finalName = newn + l
 
    console.log(finalName)
 
*/



/*
function formatName(name) {

    let finalName = []

    for (let index = 0; index < name.length; index++) {

        let nameUP = name[index][0].toUpperCase()

        let nameCat = name[index].slice(1)

        finalName.push(nameUP + nameCat)
    }

    return finalName

}



let Name = ['rahim', 'karim', 'salma']

let res = formatName(Name)

console.log(res)
*/

/*
function formatName(names) {

    return names.map((name,index) => {

        let faristLater = name[0].toUpperCase()
        let restOfName = name.slice(1).toLowerCase()

        return faristLater + restOfName


    })


}

let Name = ['rahim', 'karim', 'salma']

let res = formatName(Name)


console.log(res)



function myMap(arr, callback) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {

        result.push(callback(arr[i], i));
    }
    return result;
}
    */





/*
function totalPrice(cartItem) {

    let total = 0


    for (let index = 0; index < cartItem.length; index++) {

        let price = cartItem[index].price
        let quantity = cartItem[index].quantity
        let isSelected = cartItem[index].isSelected

        if (isSelected) {

            total = total + price * quantity

        }
    }



    return total
}


let cart = [
    { name: 'Shirt', price: 500, quantity: 2, isSelected: true },
    { name: 'Pants', price: 1200, quantity: 1, isSelected: false },
    { name: 'Socks', price: 100, quantity: 3, isSelected: true }
];

let res = totalPrice(cart)

console.log(res)
*/



/*
function totalPrice(cartItem) {


    return cartItem.filter((item) => item.isSelected).reduce((acc, item) => acc + (item.price * item.quantity), 0)


}




let cart = [
    { name: 'Shirt', price: 500, quantity: 2, isSelected: true },
    { name: 'Pants', price: 1200, quantity: 1, isSelected: false },
    { name: 'Socks', price: 100, quantity: 3, isSelected: true }
];

let res = totalPrice(cart)

console.log(res)

*/

/*
function handleSubmit(e){

    e.
    
    alert('hello')

}


let btn = document.querySelector('button')


btn.onclick = handleSubmit


 let btn = document.querySelector('button');



function handleSubmit(e) {
    // ১. ক্লিক করলে ব্রাউজার নিজেই এই 'e' পাঠায়
    e.pre
    // ২. বাটনের ভেতর বা টেক্সট এক্সেস করার নিয়ম:
    console.log(e.target); // পুরো বাটন এলিমেন্ট দেবে (<button>click</button>)
    alert(e.target.innerText); // বাটনের টেক্সট 'click' অলার্ট করবে
}

// ৩. ব্রাউজারকে ফাংশনের রেফারেন্স দেওয়া (ব্র্যাকেট ছাড়া)
btn.onclick = handleSubmit;

*/




/*
class BankAccount {
    constructor(holderName, initialDeposit) {
        this.holderName = holderName; // ১. ইউজারের নাম
        this.balance = initialDeposit; // ২. শুরুতে কত টাকা দিল

        // ৩. ব্যালেন্স আপডেট করার মেথড (টাকা জমা করার জন্য)
        this.deposit = function(amount) {
            this.balance = this.balance + amount; // ভেতরে থাকা balance ভ্যারিয়েবলটা আপডেট হচ্ছে
            console.log(amount + " টাকা জমা হয়েছে। বর্তমান ব্যালেন্স: " + this.balance + " টাকা।");
        };

        this.withdraw = function(amount){
            this.balance = this.balance - amount
            console.log('withdraw successfully')
        }
    }
}

// এবার অবজেক্ট বানিয়ে ব্যবহার করি:
const account1 = new BankAccount("Noyun", 500); // নাম: Noyun, শুরুতে জমা: ৫০০ টাকা

console.log(account1.holderName); // আউটপুট: Noyun
console.log(account1.balance);    // আউটপুট: 500 (শুরুর ব্যালেন্স)

// এবার বাইরে থেকে মেথড ডেকে ভেতরের balance আপডেট করব
account1.deposit(300); // আউটপুট: 300 টাকা জমা হয়েছে। বর্তমান ব্যালেন্স: 800 টাকা।

console.log(account1.balance);    // আউটপুট: 800 (আপডেট হওয়ার পর)


account1.withdraw(200)

console.log(account1.balance)

*/



/*

function checkUserPermission(isAdmin) {


    return new Promise((resolve, reject) => {

        console.log("Checking permission...");

        setTimeout(() => {
            if (isAdmin === true) {
                resolve("Welcome! You have accessed the admin panel.");
            } else {
                reject("Access denied! You do not have permission.");
            }
        }, 1500);
    });


}
*/

/*
checkUserPermission(true)
    .then((res) => {
        console.log("Success:", res);
    })
    .catch((err) => {
        console.log("Error:", err);
    });



function testPromise() {
    // ১ম প্যারামিটার: reject, ২য় প্যারামিটার: resolve
    return new Promise((reject, resolve) => {
        
        // আমরা ১ম প্যারামিটারটাই কল করছি (যা ফেল মারার বাটন)
        reject("Error happened!"); 
    });
}

testPromise()
    .then((res) => console.log("Then ran:", res))
    .catch((err) => console.log("Catch ran:", err));
*/



/*
let array = [1, 2, 3, 4, 5, 6];

array.forEach((element, index, arr) => {
  
    arr[index] = element + 1;
    
    
});

console.log(array); 


let nums = [10, 20, 30];

nums.forEach(num => {
    console.log(num * 2);
});

*/



/*
let names = ['rokey', 'love', 'israt']

for (const element of names) {

    console.log(element.toUpperCase())

}


for (const key in names) {

    console.log(key)

}


let userProfile = { name: "Rokey", role: "Developer", age: 24 };

// ইউজারের সব তথ্য প্রিন্ট বা চেক করার জন্য:
for (const key in userProfile) {
    console.log(`${key}: ${userProfile[key]}`);
}
// আউটপুট: name: Rokey, role: Developer, age: 24



for (const name of names) {
    if (name === 'love') break; // 'love' পেলেই লুপ বন্ধ হয়ে যাবে!
    console.log(name);
}

*/

/*
let [Name, setneme] = ['rokey', 'israt']


console.log(Name, setneme)



let obj = {
    name: rokey,
    age: 18,
    adult: true,
    smoking: false,
}

const { name, age, smoking } = obj
*/



