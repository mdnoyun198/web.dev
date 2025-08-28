let a = [1,2,93,4,5,6,88]


// for (let index = 0; index < a.length; index++) {
//     const element = a[index];
//     console.log(element)
    
// }



// let array = [10, 20, 30];

// array.forEach((value, index, arr) => {
//     console.log("Value:", value);
//     console.log("Index:", index);
//     console.log("Array:", arr);
//     console.log("------");
// });




 let obj ={
    a:1,
    b:2,
    c:3,
 }
 for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const element = obj[key];
        console.log(key,element)
        
    }
 }

 for (const element of a) {

    console.log(element)
    
 }