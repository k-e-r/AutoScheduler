const Plan = require('../../models/plan');

const setPlan = (req, res) => {
  const plan = new Plan(req.body);

  plan
    .save()
    .then(() => {
      res.status(201).json({
        msg: 'set plan succeeded',
        plan,
      });
    })
    .catch((err) => {
      res.status(400).json({
        msg: 'set plan failed',
        err,
      });
    });
};

const getPlans = (req, res) => {
  Plan.find({})
    .then((plan) => {
      res.status(200).json({
        msg: 'get plan succeeded',
        plan,
      });
    })
    .catch((err) => {
      res.status(500).json({
        msg: 'get plan failed',
        err,
      });
    });
};

const getPlan = (req, res) => {
  const planId = req.params.id;

  Plan.findById(planId)
    .then((plan) => {
      res.status(200).json({
        msg: 'find plan succeeded',
        plan,
      });
    })
    .catch((err) => {
      res.status(500).json({
        msg: 'plan not found',
        err,
      });
    });
};

const searchPlan = (req, res) => {
  const keyword = req.body;

  Plan.find(
    {
      userId: keyword.userId,
      date: {
        $gte: new Date(keyword.start),
        $lte: new Date(keyword.end),
      },
    },
    (err, data) => {
      if (err) {
        return res.status(404).json({
          msg: 'plan not found',
          err,
        });
      } else {
        return res.status(200).json({
          msg: 'find plan succeeded',
          plan: data,
        });
      }
    }
  );
};

const editPlan = (req, res) => {
  const planId = req.params.id;

  try {
    Plan.findByIdAndUpdate(
      planId,
      {
        $set: req.body,
      },
      (err, docs) => {
        if (err) {
          res.status(404).json({
            msg: 'plan not found',
            err,
          });
        } else {
          res.status(200).json({
            msg: 'update plan succeeded',
            plan: docs,
          });
        }
      }
    );
  } catch (err) {
    res.status(500).json({
      msg: 'update failed',
      err,
    });
  }
};

const deletePlan = (req, res) => {
  const planId = req.params.id;

  try {
    Plan.findByIdAndDelete(planId, (err, docs) => {
      if (err) {
        res.status(404).json({
          msg: 'plan not found',
          err,
        });
      } else {
        res.status(200).json({
          msg: 'delete plan succeeded',
          plan: docs,
        });
      }
    });
  } catch (err) {
    res.status(500).json({
      msg: 'delete failed',
      err,
    });
  }
};

const deleteBaseIdPlan = (req, res) => {
  const keyword = req.body;

  try {
    Plan.deleteMany(
      {
        baseId: keyword.baseId,
        date: {
          $gt: new Date(keyword.date),
        },
      },
      (err, docs) => {
        if (err) {
          res.status(404).json({
            msg: 'plan not found',
            err,
          });
        } else {
          res.status(200).json({
            msg: 'delete plan succeeded',
            plan: docs,
          });
        }
      }
    );
  } catch (err) {
    res.status(500).json({
      msg: 'delete failed',
      err,
    });
  }
};

module.exports = {
  setPlan,
  getPlans,
  searchPlan,
  getPlan,
  editPlan,
  deletePlan,
  deleteBaseIdPlan,
};
