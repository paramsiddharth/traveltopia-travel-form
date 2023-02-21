require('dotenv').config();

const fs = require('fs-extra');
const path = require('path');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');

const controller = require('./controller');

const port = process.env.PORT || 5000;
const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));

  app.use(cors({
    origin: 'http://localhost:3000'
  }));
}

app.use('/api', controller);

const frontendPath = path.resolve(__dirname, 'dist');
if (fs.pathExistsSync(frontendPath)) {
  app.use('/', express.static(frontendPath));
}

app.use((_, res) => {
  res.setHeader('Content-Type', 'text/html').sendFile(path.join(frontendPath, 'index.html'));
});

mongoose
  .set('strictQuery', true)
  .connect(process.env.MONGODB_URI || 'http://localhost/traveltopia', () => {
    console.log('Connected to the database.');
    app.listen(port, () => console.log(`Server running on http://localhost:${port}/`));
  });