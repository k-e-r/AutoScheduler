const express = require('express');
const {
  setPlan,
  getPlans,
  getPlan,
  editPlan,
  deletePlan,
} = require('./plans.controller');

const plansRouter = express.Router();

plansRouter.post('/', setPlan);
plansRouter.get('/', getPlans);
plansRouter.get('/:id', getPlan);
plansRouter.put('/:id', editPlan);
plansRouter.delete('/:id', deletePlan);

module.exports = plansRouter;
