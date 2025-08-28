// console.log("Hello start Async and Await")


// async function getData() {
//     return new Promise((resolve, reject) => {

//         setTimeout(() => {

//             resolve("Task1")

//         }, 3000);

//     })

// }



async function getData() {
    // Simulate getting data from a server
    // let x = await fetch('https://jsonplaceholder.typicode.com/todos/1')

    let x = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify({
                    title: 'foo',
                    body: 'bar',
                    userId: 1,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
    let data = await x.json() 
    return data
}

async function main(){
    console.log("Loading modules")

    console.log("Do something else")

    console.log("Load data")

    let data = await getData()

    console.log(data)

    console.log("process data")

    console.log("task 2")

}

main()










// async function main() {


//     console.log("Loding Module...")

//     console.log("Do Something...")

//     console.log("Lode Data...")


//     let Data = await getData()
//     console.log(Data)



//     console.log("process data")
//     console.log("Task2")

// }

// main()


// Data.then((v) => {

//     console.log(Data)

//     console.log("Task2")

// })

