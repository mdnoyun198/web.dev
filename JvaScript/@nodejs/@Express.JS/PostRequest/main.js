const express = require('express')

const blog = require('./routes/blog')
const shop = require('./routes/shop')

const app = express()
const port = 3000


app.use(express.static("public"))





app.use('/blog', blog)
app.use('/shop', shop)



app.get('/', (req, res) => {

    console.log("hay im get reqerst")

    res.send('Hello World!')
})





app.post('/', (req, res) => {

    console.log("hay im post reqerst")

    res.send('Hello World! post')
})





app.get('/api', (req, res) => {


    res.json({ a: 1, b: 2, c: 3, d: 4, e: 5 })


})





app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})  