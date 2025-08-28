


// Async

// console.log("Rokey is a Hacker")
// console.log("i love israt")




// setTimeout(() => {
//     console.log("The is good")
// }, 3000);


// setTimeout(() => {
//     console.log("The is note good")
// }, 4000);


// console.log("The End")



// function imLove(callback) {
//     console.log("Your selected")  /*কাজ শুরু হলো...*/


//     setTimeout(() => {


//         console.log("The end")   /*কাজ শেষ ✅...*/


//         callback() /* পরে কল করলাম */


//     }, 3000);
// }


// imLove(()=>{
//     console.log("Callback") /*এখন আমি চললাম 🚀*/
// })




function checkStatus(callback) {

    // rendom number
    const number = Math.random();
    console.log("Your Number", number.toFixed(2))





    // check number
    if (number >= 0.5) {
        callback("Success")
    }

    else {

        callback("Pending")
    }

}


// result in number
checkStatus(function(status) {
    console.log(status);
});