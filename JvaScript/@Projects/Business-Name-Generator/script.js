
// Business-Name-Generator JavaScript




let firstRand = Math.random();
let secondRand = Math.random();
let thirdRand = Math.random();

let fist, second, third;



if (firstRand < 0.33) {
    fist = "Crazy"
}

else if (firstRand < 0.66 && firstRand > 0.33) {
    fist = "Amazing"
}
else {
    fist = "Fire"
}






if (secondRand < 0.33) {
    second = "Engine"
}

else if (secondRand < 0.66 && secondRand > 0.33) {
    second = "Foods"
}
else {
    second = "Garments"
}






if (thirdRand < 0.33) {
    third = "Bros"
}

else if (thirdRand < 0.66 && thirdRand > 0.33) {
    third = "Limited"
}
else {
    third = "Hub"
}





console.log(`${fist} ${second} ${third}`)