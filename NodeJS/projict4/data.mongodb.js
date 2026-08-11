use("Test")




// db.new.insert([

//     {
//         "name": "Emily Watson",
//         "age": NumberInt(22),
//         "adult": true

//     },

//     {
//         "name": "Liam Carter",
//         "age": NumberInt(15),
//         "adult": false

//     },

//     {
//         "name": "Sophia Rodriguez",
//         "age": NumberInt(31),
//         "adult": true

//     },
//     {
//         "name": "Ethan Brooks",
//         "age": NumberInt(9),
//         "adult": false

//     },
//     {
//         "name": "Olivia Chen",
//         "age": NumberInt(27),
//         "adult": true

//     },
//     {
//         "name": "Noah Thompson",
//         "age": NumberInt(18),
//         "adult": true

//     },
//     {
//         "name": "Ava Martinez",
//         "age": NumberInt(5),
//         "adult": false

//     },
//     {
//         "name": "Lucas Kim",
//         "age": NumberInt(40),
//         "adult": true

//     },
//     {
//         "name": "Mia Gallagher", "age": NumberInt(16), "adult": false

//     },
//     {
//         "name": "Oliver Hansen",
//         "age": NumberInt(63),
//         "adult": true

//     }


// ])


// db.new.deleteMany({})

db.new.deleteOne({

    "name":"Lucas Kim"

})


// db.new.insertMany([
    
//     {
//         "name": "Lucas Kim",
//         "age": NumberInt(40),
//         "adult": true

//     },
   
//     {
//         "name": "Lucas Kim",
//         "age": NumberInt(63),
//         "adult": true

//     }

// ])