const express = require('express');
const { setPlan, getPlans, getPlan, editPlan } = require('./plans.controller');

const plansRouter = express.Router();

plansRouter.post('/', setPlan);
plansRouter.get('/', getPlans);
plansRouter.get('/:id', getPlan);
plansRouter.put('/:id', editPlan);

module.exports = plansRouter;
