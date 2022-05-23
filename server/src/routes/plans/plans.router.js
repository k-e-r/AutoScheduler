const express = require('express');
const { setPlan } = require('./plans.controller');

const plansRouter = express.Router();

plansRouter.get('/', setPlan);

module.exports = plansRouter;
