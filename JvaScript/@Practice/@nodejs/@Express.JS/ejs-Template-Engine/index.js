const express = require('express')
const app = express()
const port = 5000
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  let sitename = "rokey"
  let sitetext = "hello"
  res.sendFile("Templates/index.html", { root: __dirname })
})



// route for blog page
app.get('/blog', (req, res) => {
  let blogTitlee = "Blog Post"
  let blogContent = "My New Post added"
  let arr = ["hello","im","rokey"]
  res.render("index", { blogTitle: blogTitlee, blogContent, arr})
})






app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})