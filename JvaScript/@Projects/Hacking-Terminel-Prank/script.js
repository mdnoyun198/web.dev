






const additem = async (item) => {
  await randomDelay();
  let div = document.createElement("div");
  div.innerHTML = item
  document.body.append(div)
}




const randomDelay = ()=>{
  return new Promise((resolve, reject)=>{
    timeout = 1 + 6*Math.random()
    setTimeout(()=>{
      resolve()
    },3000);
 })
}




                                  
async function main() { // maim → main
  setInterval(() => { // = → =>
    let last = document.body.lastElementChild;
    
    if (last.innerHTML.endsWith("...")) { // endswWith → endsWith
      last.innerHTML = last.innerHTML.slice(0, last.innerHTML.length - 3); // innerHTML → last.innerHTML
    } else {
      last.innerHTML = last.innerHTML + ".";
    }
  }, 100);
  
  let text = [
    ">>> inatall vires ciaking all password",
    ">>> reading your password",
    ">>> password file detected",
    ">>> sending your password secsfulle",
    ">>> cleaning up"
  ];
  
  for (let item of text) {
    await additem(item); // additem অবশ্যই আগে ডিফাইন করতে হবে
  }
}

main();