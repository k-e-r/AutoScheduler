const express = require('express');
const { setPlan, getPlans, getPlan } = require('./plans.controller');

const plansRouter = express.Router();

plansRouter.post('/', setPlan);
plansRouter.get('/', getPlans);
plansRouter.get('/:id', getPlan);

module.exports = plansRouter;
