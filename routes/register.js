const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const connection = require('../conf')

const router = express.Router()

router.post('/', (req,res)=>{
  const emailRegEx= /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
  
  if(!emailRegEx.test(req.body.email)){
    return res.status(401).send('Unauthorized user')
  }

  const user ={
    name : req.body.name,
    lastName : req.body.lastName,
    email : req.body.email,
    password : bcrypt.hashSync(req.body.password)
  }
  

  connection.query(`SELECT id FROM person WHERE email = ?`, user.email, (err,result) =>{
    if(err) {
      return res.status(500).send('internal server error')
    }
    
    else if(result.length>0) { 
      return res.status(409).send('User already exists')
    }

    connection.query(`INSERT INTO person SET ?`, user, (err,result)=>{
      if(err){
        return res.status(500).send('Cannot register the user')
      }

      connection.query(`SELECT id, name, lastname, email FROM person WHERE id =?`, result.insertId, (err, result) =>{
        if(err) {
          return res.status(500).send('Internal server error')
        }
        res.status(200).send(result)
      })
    })
  })
})

module.exports = router