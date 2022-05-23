const express = require('express');
const { setPlan } = require('./plans.controller');

const plansRouter = express.Router();

plansRouter.post('/', setPlan);

module.exports = plansRouter;
