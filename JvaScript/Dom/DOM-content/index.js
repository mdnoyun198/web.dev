document.body.querySelector(".box").innerHTML="hello im a box";
// edit html vloe


let a = document.getElementsByClassName("box1")[0].hasAttribute("style")
console.log(a)
// saee the line



let b = document.body.getElementsByClassName("box2")[0].getAttribute("style")   
console.log(b)
// giv me the line



let c = document.body.getElementsByClassName("box3")[0].setAttribute("style", "background-color: green")
console.log(c)
// edit style





document.getElementsByClassName("box4")[0].removeAttribute("class")
// remove style



document.designMode="on"
// edit full




let d = document.getElementsByClassName("box5")[0].dataset
console.log(d)



let e = document.createElement("div")
e.innerHTML=("imrokey")
e.setAttribute("class", "box")
e.setAttribute("style", "background-color: green")
document.querySelector(".content").append(e)

// crate a new div




let f = document.createElement("div")
f.innerHTML=("imrokey")
f.setAttribute("class", "box")
f.setAttribute("style", "background-color: green")
document.querySelector(".content").before(f)




g = document.getElementsByClassName("box6")[0].classList
document.getElementsByClassName("box6")[0].classList.add ("x")
console.log(g)
// add mor class


document.getElementsByClassName("box6")[0].classList.remove ("box")
// remove class