const express = require('express');
const bodyParser = require('body-parser')

const connection = require('./conf')
const routes = require('./routes/index')

const app = express();
const port = 4000

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/person', routes.Person)
app.use('/speciality', routes.Speciality)


app.get('/', (req, res,) => {
  return res.status(200).send('Connected to the server')
})

app.listen(port, err => {
  if(err) throw new Error ('something bad happened...')
  console.log(`Server is listening on port ${port}`);
})