const express = require('express');
const morgan = require('morgan');
const { initDB } = require('./config/database');
const routes = require('./routes');
const logger = require('./config/logger');

const app = express();

app.use(express.json());
app.use(morgan('combined', { stream: logger.stream }));

const port = 3000;

app.use('/', routes);

async function initApp() {
  try {
    await initDB();
    app.listen(port, () => logger.info(`App listening on port ${port}!`));
  } catch (error) {
    logger.error('initApp error: ', error);
    process.exit(1);
  }
}

initApp();
