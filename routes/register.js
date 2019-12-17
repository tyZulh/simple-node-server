const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const connection = require('../conf')

const router = express.Router()

router.post('/', (req,res)=>{
  const user ={
    firstname : req.body.firstname,
    prefix : req.body.prefix, 
    email : req.body.email,
    speciality_id : req.body.speciality_id,
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

      connection.query(`SELECT * FROM person WHERE id =?`, result.insertId, (err, result) =>{
        if(err) {
          return res.status(500).send('Internal server error')
        }
        res.status(200).send(result)
      })
    })
  })
})

module.exports = router