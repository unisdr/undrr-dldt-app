const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.get('/config.js', (req, res) => {
  const config = {
    REACT_APP_API_URL: process.env.REACT_APP_API_URL,
    REACT_APP_ACCESS_TOKEN: process.env.REACT_APP_ACCESS_TOKEN
  };

  res.setHeader('Content-Type', 'application/javascript');
  res.send(`window._env_ = ${JSON.stringify(config)};`);
});

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 3000);