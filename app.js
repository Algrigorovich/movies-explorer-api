const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');
const handleError = require('./middlewares/handle-error');
const NotFoundError = require('./errors/not-found-err');
const { dbConnectDev, corsOptions } = require('./constants/config');
const { urlNotFound } = require('./constants/messages');

const { PORT = 3000, DB_CONN, NODE_ENV } = process.env;
const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(requestLogger);

mongoose.connect(NODE_ENV === 'production' ? DB_CONN : dbConnectDev);

app.use(helmet());
app.use(limiter);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use((req, res, next) => {
  next(new NotFoundError(urlNotFound));
});
app.use(handleError);
app.listen(PORT);
