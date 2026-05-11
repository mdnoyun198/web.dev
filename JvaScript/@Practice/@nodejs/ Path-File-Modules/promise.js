import fs from  'fs/promises'

let a = await fs.readFile("rokey.txt")

let b = await fs.writeFile("new", "hello modn \ln \ln   you")

console.log(a.toString(), b)