const express = require('express');
const app = express();
const port = 3000;
const jsonFile = 'data.json';

const fs = require('fs');



app.use(express.json());

app.get('/', (req, res) => {
    let rawdata = fs.readFileSync( jsonFile );
    let jsonData = JSON.parse(rawdata);
    const data = jsonData.users;

    if(req.query.id === undefined){
        res.send(data)
    }
    else{
        const finalData = data.find((item) => {
            return item.id == req.query.id;
        })
        res.send(finalData)
    }
    
})


app.post('/', (req, res) => {
    let rawdata = fs.readFileSync( jsonFile );
    let jsonData = JSON.parse(rawdata);
    const data = jsonData.users;

    const reqBody = req.body;

    if(reqBody.id == undefined){
        reqBody.id = String(new Date);
    }

    data.push(req.body);

    const finalData = JSON.stringify({ users : data }, null, 2)
    fs.writeFileSync('data.json', finalData);   

    // res.send(reqBody);
  })


app.delete('/', (req, res) => {
    let rawdata = fs.readFileSync( jsonFile );
    let jsonData = JSON.parse(rawdata);
    const data = jsonData.users;

    data.forEach((item,index) => {
        if(item.id == req.query.id){
            data.splice(index, 1);
            const finalData = JSON.stringify({ users : data }, null, 2)
            fs.writeFileSync('data.json', finalData);  
            // res.send(data)
        }
    })


  })


app.put('/', (req, res) => {
    let rawdata = fs.readFileSync( jsonFile );
    let jsonData = JSON.parse(rawdata);
    const data = jsonData.users;

    data.forEach(( item, index ) => {
        if( item.id == req.query.id ){
            data[ index ] = { ...req.body };
            res.send( data[ index ] );
            const finalData = JSON.stringify({ users : data }, null, 2)
            fs.writeFileSync('data.json', finalData);
        }
    })

  })

app.patch('/', (req, res) => {
    let rawdata = fs.readFileSync( jsonFile );
    let jsonData = JSON.parse(rawdata);
    const data = jsonData.users;

    data.forEach(( item, index ) => {
        if( item.id == req.query.id ){
            Object.keys({ ...req.body }).forEach((key)=>{
                data[ index ][key] = req.body[key];
            })

            res.send( data[ index ] );
            const finalData = JSON.stringify({ users : data }, null, 2)
            fs.writeFileSync('data.json', finalData);
        }
    })

  })


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})