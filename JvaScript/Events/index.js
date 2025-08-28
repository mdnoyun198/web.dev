console.log("hello")

let btn = document.getElementById("btn")
let text = document.getElementsByClassName("box")[0]


btn.addEventListener("click", ()=>{
    alert("Hi")
    text.innerHTML="im rokey"
})



document.addEventListener("keydown", (e)=>{
    console.log(e)
})