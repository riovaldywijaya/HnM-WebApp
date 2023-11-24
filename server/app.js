if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const router = require('./router');

app.use(cors());
app.use(express.json());

app.use(router);

app.use(errorHandler);

console.clear();
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
