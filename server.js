const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')

const connection = require('./conf')
const routes = require('./routes/index')

const app = express();
const port = 4000

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/auth', routes.Authentication)
app.use('/register', routes.Register)


app.get('/', (req, res,) => {
  return res.status(200).send('Connected to the server')
})

app.listen(port, err => {
  if(err) throw new Error ('something bad happened...')
  console.log(`Server is listening on port ${port}`);
})