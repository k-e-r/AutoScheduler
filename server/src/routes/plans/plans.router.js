const express = require('express');
const {
  setPlan,
  getPlans,
  searchPlan,
  getPlan,
  editPlan,
  deletePlan,
} = require('./plans.controller');

const plansRouter = express.Router();

plansRouter.post('/', setPlan);
plansRouter.get('/', getPlans);
plansRouter.post('/search', searchPlan);
plansRouter.get('/search/:id', getPlan);
plansRouter.put('/:id', editPlan);
plansRouter.delete('/:id', deletePlan);

module.exports = plansRouter;
