require('dotenv').config();
const express = require('express');
require('./db/mongoose');
const Plan = require('./models/plan');

const plansRouter = require('./routes/plans/plans.router');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use('/plans', plansRouter);

app
  .listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
  })
  .on('error', (err) => {
    console.error(err);
    process.exit(1);
  });
