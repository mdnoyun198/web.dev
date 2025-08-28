
async function sleep() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(12);
        }, 3000);
    });
}





(async function main(){
let a = await sleep()
console.log(a)
})()