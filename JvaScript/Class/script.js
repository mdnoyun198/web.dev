// console.log("Hello World")


// let obj ={
//     a: 1,
//     b: "Rokey",
// }

// console.log(obj)







class animal {
    constructor(name) {

        console.log("object ran code....")
    }

    east() {
        console.log("ma kha rah homm")
    }
    jiump() {
        console.log("ma kood ra ha homm")
    }
}

 class line extends animal {
    constructor(name){
        super()
        this.name = name
        console.log("objiect is line")
    }

 }