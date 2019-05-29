const express = require('express');
const { initDB } = require('./config/database');
const routes = require('./routes');

const app = express();
const port = 3000;

app.use('/', routes);

async function initApp() {
  try {
    await initDB();
    app.listen(port, () => console.log(`App listening on port ${port}!`));
  } catch (error) {
    console.error(error);
  }
}

initApp();
