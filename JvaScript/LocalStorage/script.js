console.log("Hello im Rokey");




// check if name localStorage

if (localStorage.getItem("name")) {

    let a = localStorage.getItem("name");

    document.getElementById("msg").innerHTML = "Welcome " + a;

}





else {

    let a = prompt("Enter your name");

    localStorage.setItem("name", a);

    document.getElementById("msg").innerHTML = "Welcome " + a;

}






let btn = document.querySelector(".btn")

btn.addEventListener("click", () => {

    let a = prompt("Enter new name");

    localStorage.setItem("name", a);

    document.getElementById("msg").innerHTML = "Welcome " + a;


})