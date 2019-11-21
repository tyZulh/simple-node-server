const express = require('express');

const app = express();

const port = 4000

app.get('/', (req, res,) => {
  return res.status(200).send('Connected to the server')
})

app.listen(port, err => {
  if(err) throw new Error ('something bad happened...')
  console.log(`Server is listening on port ${port}`);
})