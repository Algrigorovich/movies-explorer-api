const jwtDevKey = 'super-puper-secret-code';
const dbConnectDev = 'mongodb://localhost:27017/testdb';
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://diploma.algrigorovich.nomoredomains.xyz',
    'https://diploma.algrigorovich.nomoredomains.xyz',
  ],
  credentials: true,
};
module.exports = { jwtDevKey, dbConnectDev, corsOptions };
