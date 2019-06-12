const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
// const { initDB } = require('./config/database');
const routes = require('./routes');
const logger = require('./config/logger');

const app = express();

app.use(express.json());
// app.use(morgan('combined', { stream: logger.stream }));
// app.use(cors());


app.use((req, res, next) => {
  if (!req.headers.auth || req.headers.auth !== '123') {
    res.sendStatus(401);
  } else {
    next();
  }
});
app.use('/', routes);

const port = process.env.PORT_API || 3001;


function initApp() {
  try {
    // await initDB();
    app.listen(port, () => logger.info(`App listening on port ${port}!`));
  } catch (error) {
    logger.error('initApp error: ', error);
    process.exit(1);
  }
}

initApp();
