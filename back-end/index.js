const fs = require('fs-extra');
const path = require('path');
const express = require('express');

const controller = require('./controller');

const port = process.env.PORT || 5000;
const app = express();

app.use('/api', controller);

const frontendPath = path.resolve(__dirname, '..', 'front-end', 'dist');
if (fs.pathExistsSync(frontendPath)) {
  app.use('/', express.static(frontendPath));
}

app.use((_, res) => {
  res.setHeader('Content-Type', 'text/html').sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}/`));