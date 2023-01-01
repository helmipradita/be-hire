const express = require('express');
const cors = require(`cors`);
const morgan = require(`morgan`);
const bodyParser = require(`body-parser`);
require(`dotenv`).config();
const mainRouter = require('./src/routes/index');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(morgan('dev'));

app.use('/', mainRouter);

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'error',
    statusCode: 404,
    message: 'this is root, check again the endpoint API',
  });
});

app.use('/', (req, res, next) => {
  res.status(200).json({ status: 'success', statusCode: 200 });
});

app.listen(port, () => {
  console.log(`🚀 Example app listening on port ${port}`);
});
