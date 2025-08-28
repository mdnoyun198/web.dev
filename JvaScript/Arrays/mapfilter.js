let arr = [1,2,3,4,5,20]

console.log(arr)

const NewArr = arr.map((Element)=>{

    return Element + 2
})

console.log(NewArr)











let arr2 = [1,2,3,4,20]

const greaterThanSeven = (Elementgg) =>{
    if (Elementgg >7){
         return true
        }

        else{
            return false
        }
}

console.log(arr2.filter(greaterThanSeven))









let arr3 = [1,2,3,4,5,6]

const red = (a, b)=>{
    return a+b
}

console.log(arr3.reduce(red))