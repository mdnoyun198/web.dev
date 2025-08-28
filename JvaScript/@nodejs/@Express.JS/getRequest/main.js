const express = require('express')
const app = express()
const port = 3000



app.use(express.static('public'))
app.get('/', (req, res) => {
    res.send('<h1>Hello Rokey</h1>')
})
app.get('/home', (req, res) => {
    res.send('Hello the is a home')
})

app.get('/about/:s', (req, res) => {

    console.log(req)

    res.send(`Hello this is About ${req.params.s}`)
})


app.get('/content-me', (req, res) => {
    res.send('Hello the is a content')
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})