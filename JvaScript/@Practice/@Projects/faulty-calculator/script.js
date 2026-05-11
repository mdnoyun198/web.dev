let random = Math.random()
console.log(random)

let a = prompt("Fast Number")
let c = prompt("Options")
let b = prompt("Second Number")



let obj = {
    "+": "-",
    "-": "+",
    "*": "/",
    "/": "*",
}




if (random > 0.1) {

    console.log(`The result is ${a} ${c} ${b}`)


    alert(`The result is ${eval(`${a} ${c} ${b}`)}`)




}

else {

    c = obj[c]
    alert(`outphot ${eval(`${a}${c}${b}`)}`)

}
