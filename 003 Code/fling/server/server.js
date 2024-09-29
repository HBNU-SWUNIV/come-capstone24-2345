// import { createServer } from 'http';
// import { parse } from 'url';
const next = require('next');
const express = require('express');
const cron = require('node-cron');
const { MongoClient } = require('mongodb');

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  let mongoDB;
  new MongoClient(process.env.DB_URL)
    .connect()
    .then((client) => {
      console.log('mongoDB 연결 성공');
      mongoDB = client.db('Fling');
    })
    .catch((err) => {
      console.log(err);
    });

  // cron.schedule('*/10 * * * * *', () => {
  //   console.log('코드실행');
  // });

  server.get('/api/custom', (req, res) => {
    res.json({ message: 'Hello from Express Server!' });
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log(`${port}에서 준비됨`);
  });
});
