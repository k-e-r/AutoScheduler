const Plan = require('../../models/plan');

const setPlan = (req, res) => {
  const plan = new Plan(req.body);

  plan
    .save()
    .then(() => {
      res.status(201).send(plan);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  // return res.status(200).json('set succeeded');
};

module.exports = {
  setPlan,
};
