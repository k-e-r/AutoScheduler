require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
require('./db/mongoose');

const plansRouter = require('./routes/plans/plans.router');
const categoriesRouter = require('./routes/categories/categories.router');
const userRouter = require('./routes/user/user.router');

const app = express();
app.use(
  cors({
    origin: [
      'https://polar-lowlands-18778.herokuapp.com',
      'http://localhost:3000',
      'http://localhost:8000',
    ],
  })
);
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/plans', plansRouter);
app.use('/categories', categoriesRouter);
app.use('/user', userRouter);

app
  .listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
  })
  .on('error', (err) => {
    console.error(err);
    process.exit(1);
  });
