console.log("Hello World")


let a = prompt("Enter a Number")

let b = prompt("Enter a Number")

let sum = parseInt(a) + parseInt(b)



if (isNaN(a) || isNaN(b)) {

    throw SyntaxError("The is ron Number")
}



// let x = 1

function main() {
    try {
        console.log("the is a number:- ", sum + x)
        return true
    }

    catch (error) {
        console.log("the is error")
        return false
    }
    finally {
        console.log("Thank call me ")


    }

}

main()