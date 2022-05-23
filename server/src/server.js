require('dotenv').config();
const express = require('express');
require('./db/mongoose');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app
  .listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
  })
  .on('error', (err) => {
    console.error(err);
    process.exit(1);
  });
