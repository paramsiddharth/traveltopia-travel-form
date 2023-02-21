const express = require('express');
const { promisify } = require('util');
const { stringify } = require('csv');

const Submission = require('../models/submission');

const controller = express.Router();

controller.get('/', async (req, res) => {
  try {
    const submissions = await Submission.find({}).sort({ createdAt: -1 });

    const records = [
      [
        'ID',
        'Name',
        'E-mail address',
        'Destination',
        'Traveller Count',
        'Budget Per Person'
      ]
    ];

    for (const submission of submissions) {
      records.push(
        [
          submission.id,
          submission.name,
          submission.email,
          submission.destination,
          submission.travellerCount,
          submission.budgetPerPerson,
        ]
      );
    }

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=submissions.csv');
    res.send(await promisify(stringify)(records));
  } catch (e) {
    console.error(e.message);
    res.status(500).send('Failed to generate CSV.');
  }
});

module.exports = controller;