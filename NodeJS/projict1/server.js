import http from 'node:http';
import fs from 'fs/promises'

const server = http.createServer((req, res) => {
    console.log(req.url, req.method, /*req.headers*/)

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');





    if (req.method === 'POST') {


        req.on('data', (chunk) => {


            console.log(chunk.toString())

            let data = chunk.toString()

            fs.appendFile('new.text', data + '\n')

            res.end(JSON.stringify('hello'))

        })


    } else {

        res.end(JSON.stringify('hello'))


    }

})

server.listen(9000, () => { console.log('server is runing http://localhost:9000/') })