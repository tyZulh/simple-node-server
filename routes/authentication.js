const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const connection = require('../conf')
const verifyToken = require('./verifyToken')

const router = express.Router()

require('dotenv').config(process.cwd(), '../.env')

const secret = process.env.JWT_SECRET

router.post('/', (req, res)=>{
  const email = req.body.email
  const password = req.body.password

  connection.query(`SELECT * FROM person WHERE email = ?`, email, (err, result)=>{
    if (err) {
      return res.status(500).send(err)
    } else if (!result[0]){
      return res.status(401).send('Unauthorized user')
    }

    const passwordIsValid = bcrypt.compareSync(password, result[0].password);
    if (!passwordIsValid){
      return res.status(401).send({ auth: false, token: null });
    }
    
    const token = jwt.sign(
      {id : result[0].id, name: result[0].firstname, email: result[0].email},
      secret,
      {
        expiresIn: '24h'// expires in 24 hours
      },
      { algorithm: 'RS256' }
    );
    res.header("Access-Control-Expose-Headers", "x-access-token")
    res.set("x-access-token", token)
    res.status(200).send({ auth: true })
  });
})

router.get('/verify', verifyToken, (req, res) => {

  const token = req.headers['x-access-token'];

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(200).send({ mess: `N'a pas accée au données` })
    }
    console.log(decoded);
    

    const values = [decoded.email]

    connection.query(`SELECT * FROM person WHERE email = ?`, values, (err, result) => {
      if (err) {
        return res.status(500).send("There was a problem finding the user.")
      }
      else if (!result[0]) {
        console.log(result);
        
        return res.status(500).send("No user found.");
      }
      res.status(200).send(result);
    });
  })
});

module.exports = router