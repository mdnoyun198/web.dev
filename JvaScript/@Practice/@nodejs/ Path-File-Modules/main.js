
const fs = require("fs")



console.log("start")

fs.writeFile("rokey.txt", "rokey is a good boy", () => {

    console.log("Dan")


    fs.readFile("rokey.txt", (error, data) => {
        console.log(error, data.toString())
    })



})


fs.appendFile("rokey.txt","rokey2", (e,d)=>{
    console.log(d)
})
console.log("ending")
