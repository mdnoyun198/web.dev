use("CrudDb")

db.createCollection("rokey")




// db.rokey.insertOne({
//     im: "rokey",
//     new: "hacker",
//     perice: 0
// })

// db.rokey.insertMany([
//     {
//         "im": "rokey1",
//         "new": "hacker",
//         "perice": 0
//     },


//     {
//         "im": "rokey2",
//         "new": "coder",
//         "perice": 5
//     },


//     {
//         "im": "rokey3",
//         "new": "tester",
//         "perice": 10
//     },


//     {
//         "im": "rokey4",
//         "new": "developer",
//         "perice": 7
//     },


//     {
//         "im": "rokey5",
//         "new": "designer",
//         "perice": 3
//     },


//     {
//         "im": "rokey6",
//         "new": "analyst",
//         "perice": 8
//     },


//     {
//         "im": "rokey7",
//         "new": "engineer",
//         "perice": 12
//     },


//     {
//         "im": "rokey8",
//         "new": "programmer",
//         "perice": 6
//     },


//     {
//         "im": "rokey9",
//         "new": "architect",
//         "perice": 15
//     },


//     {
//         "im": "rokey10",
//         "new": "manager",
//         "perice": 20
//     }

// ])




// let a = db.rokey.find({"perice": 0})

// console.log(a.count(),a.toArray())



// let a = db.rokey.findOne({"perice": 0})

// console.log(a)


// Update

db.rokey.updateMany(
    { perice: 0 },       // কুয়েরি: কোন ডকুমেন্ট আপডেট হবে
    { $set: { perice: 100 } }  // নতুন মান
)






// Delete


db.rokey.deleteOne({perice:100})

db.rokey.deleteMany({perice:100})