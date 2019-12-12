const express = require("express")
const connection =require("../conf")
const router = express.Router()

router.get('/', (req, res) => {
  connection.query('SELECT * FROM person', (err, result)=>{
    if(err){
      res.status(500).send('Internal server error')
    }else{
      res.status(200).send(result)
    }
  })
})

router.get('/:id', (req,res) => {
  const id = req.params.id
  connection.query('SELECT * FROM person WHERE id = ?',id, (err, result)=>{
    if(err){
      res.status(500).send('Internal server error')
    }else{
      res.status(200).send(result)
    }
  })
})

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
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

module.exports = router