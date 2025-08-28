console.log("Helo The is Promise")


// new promise crate

// let promise1 = new Promise((resolve, reject) => {

//     let a = Math.random();
//     if (a < 0.5) {
//         reject("service eorr")
//     }
//     else {


//         setTimeout(() => {

//             console.log("yes im Done")
//             resolve("Hello it is oky")

//         }, 2000);
//     }
// })

// // the is a retun ans

// promise1.then((a) => {
//     console.log(a)
// }).catch((err) => {
//    console.log(err);
// });





let prom1 = new Promise((resolve, reject) => {
    let a = Math.random();


    if (a < 0.5) {
        reject("No random number was not supporting you")
    }


    else {
        setTimeout(() => {
            console.log("Yes I am done")
            resolve("rokey")
        }, 3000);
    }


})




let prom2 = new Promise((resolve, reject) => {
    let a = Math.random();


    if (a < 0.5) {
        reject("No random number was not supporting you 2")
    }


    else {
        setTimeout(() => {
            console.log("Yes I am done 2")
            resolve("rokey 2")
        }, 1000);
    }


})

 

let p3 = Promise.race([prom1, prom2])
p3.then((a)=>{
    console.log(a)
}).catch(err=>{
    console.log(err)
})