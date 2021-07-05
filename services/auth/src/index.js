const dotenv = require('dotenv');
const moduleAlias = require('module-alias');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

require('express-async-errors');

dotenv.config();
moduleAlias.addAlias('@', __dirname);

const app = express();
const port = process.env.APP_PORT;
const logger = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
);

app.use(logger);
app.use(bodyParser.json());

app.get('/', (req, res) => {
  return res.json({
    message: 'hello',
  });
});

app.listen(port, () => {
  console.log(`[x] Listening on port ${port}`);
});
