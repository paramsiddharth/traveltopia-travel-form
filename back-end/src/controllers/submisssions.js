const express = require('express');

const { maxSubmissionsPerPage } = require('../../../config.json');
const Submission = require('../models/submission');

const controller = express.Router();

controller.use(express.json({ strict: true }));

controller.route('/')
  .get(async (req, res) => {
    const page = parseInt(req.query.page || 0);
    const total = Math.ceil((await Submission.count()) / maxSubmissionsPerPage);
    const submissions = await Submission
      .find({})
      .sort({ createdAt: -1 })
      .skip(page * maxSubmissionsPerPage)
      .limit(maxSubmissionsPerPage);
    
    res.json({
      submissions,
      page,
      total
    });
  })
  .post(async (req, res) => {
    try {
      const data = req.body;
      const submission = new Submission(data);

      await submission.save();
      res.json(submission);
    } catch {
      res.status(500).send('Unable to accept submission.');
    }
  });

controller.get('/:id', async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    res.json(submission);
  } catch {
    res.status(404).send('Submission not found!');
  }
});

controller.get('/:id', async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    res.json(submission);
  } catch {
    res.status(404).send('Submission not found!');
  }
});

module.exports = controller;