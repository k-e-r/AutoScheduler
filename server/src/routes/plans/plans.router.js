const express = require('express');
const { setPlan, getPlans } = require('./plans.controller');

const plansRouter = express.Router();

plansRouter.post('/', setPlan);
plansRouter.get('/', getPlans);

module.exports = plansRouter;
