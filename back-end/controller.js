const express = require('express');

const controller = express.Router()

controller.get('/*', (req, res) => {
	res.send('Hi!');
});

module.exports = controller;