const express = require('express');
const bodyParser = require('body-parser')
const connection = require('./conf')

const app = express();

const port = 4000

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json())

app.get('/', (req, res,) => {
  return res.status(200).send('Connected to the server')
})

app.get('/person', (req, res) => {
  connection.query('SELECT * FROM person', (err, result)=>{
    if(err){
      res.status(500).send('Internal server error')
    }else{
      res.status(200).send(result)
    }
  })
})

app.get('/person/:id', (req,res) => {
  const id = req.params.id
  connection.query('SELECT * FROM person WHERE id = ?',id, (err, result)=>{
    if(err){
      res.status(500).send('Internal server error')
    }else{
      res.status(200).send(result)
    }
  })
})

app.post('/person', (req, res) => {
  const personToAdd = req.body
  console.log(personToAdd);
  
  connection.query('INSERT INTO person SET ?', personToAdd, (err,result)=>{
    console.log(result);
    
    if(err){
      console.log(err);
      
      res.status(500).send('Internal server error')
    }else{
      res.sendStatus(200)
    }
  })
})

app.put('/person/:id', (req, res) => {
  const id = req.params.id
  const dataToUpdate = req.body
  connection.query('UPDATE person SET ? WHERE id =?', [dataToUpdate, id], (err, result)=>{
    if(err) {
      res.status(500).send('Internal server error')
    }else{
      res.sendStatus(200)
    }
  })
})


app.listen(port, err => {
  if(err) throw new Error ('something bad happened...')
  console.log(`Server is listening on port ${port}`);
})