const express = require('express');
const {
  setPlan,
  getPlans,
  searchPlan,
  getPlan,
  editPlan,
  deletePlan,
  deleteBaseIdPlan,
} = require('./plans.controller');

const plansRouter = express.Router();

plansRouter.post('/', setPlan);
plansRouter.get('/', getPlans);
plansRouter.post('/search', searchPlan);
plansRouter.get('/search/:id', getPlan);
plansRouter.put('/:id', editPlan);
plansRouter.delete('/delete/:id', deletePlan);
plansRouter.delete('/delete', deleteBaseIdPlan);

module.exports = plansRouter;
