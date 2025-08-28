
let a = document.querySelector(".btn")
let b = document.querySelector(".content")
let c = document.querySelector(".box")






a.addEventListener("click", (p) => {
    p.stopPropagation()
    alert("Hello Bro im Rokey hare?")
})



b.addEventListener("click", () => {
    alert("content is on")
})



c.addEventListener("click", () => {
    alert("box is on")
})






function getRandomColor() {
    let val1 = Math.ceil(0 + Math.random() * 255);
    let val2 = Math.ceil(0 + Math.random() * 255);
    let val3 = Math.ceil(0 + Math.random() * 255);
    return `rgb(${val1}, ${val2}, ${val3})`
}









let d = setInterval(() => {
    c.style.backgroundColor = getRandomColor();
}, 1000);


let e = setInterval(() => {
    b.style.backgroundColor = getRandomColor();
}, 1000);

let f = setInterval(() => {
    a.style.backgroundColor = getRandomColor();
}, 1000);
