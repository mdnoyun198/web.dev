import express from 'express';
import fs from 'fs/promises'
import path from 'path';
const app = express();
const port = 3000;


app.get('/', (req, res) => {

 res.send('heelo this is not home')
  


});


app.get('/home', (req, res) => {

   
 res.sendFile(path.join(process.cwd(), 'src', 'home.html'))



})












app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});