// Arrays
const upperCase = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M","N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

const lowerCase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m","n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const symbols = ["@", "#", "৳", "$", "%", "&", "?", "!"];





// Count function
function countFrom(set, pw) {
    return [...pw].filter(ch => set.includes(ch)).length;
}




// Validation function
function validatePassword(pw) {
    let errors = [];



    const upCount = countFrom(upperCase, pw);
    const lowCount = countFrom(lowerCase, pw);
    const digitCount = countFrom(digits, pw);
    const symCount = countFrom(symbols, pw);



    if (upCount < 2) errors.push("Kompotekke 2ta UPPERCASE (A-Z) lagbe.");
    if (lowCount < 3) errors.push("Kompotekke 3ta lowercase (a-z) lagbe.");
    if (digitCount < 2) errors.push("Kompotekke 2ta number (0-9) lagbe.");
    if (symCount < 1) errors.push("Kompotekke 1ta symbol (@#৳$%&?!) lagbe.");



    if (errors.length === 0) {
        console.log("✅ Your password:", pw);
    } else {
        console.error("❌ Error(s):");
        errors.forEach(err => console.error(err));
    }


}



// Prompt
const userPass = prompt("Enter your password:");
if (userPass) validatePassword(userPass);
