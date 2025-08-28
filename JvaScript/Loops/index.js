console.log("Hello im noyoun")

let a = 1

console.log(a+1)

for (let i = 0; i < 10; i++) {
    console.log(a+i)
    
}

let ob = {
    name: "Noyun",
    user: "n198",
    com: "prohunter",
}

for (const key in ob) {
    const element = ob [key];
    console.log(key, element);
}


for (const c of "Noyun") {
    console.log(c)
}





let x =5;

while (x<6) {
    console.log(x)
   x++ ;
}


let y = 0;
do {
    console.log(y)
    y++;
    
} while (y<6);