const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const nodemailer = require("nodemailer");
const schedule = require("node-schedule");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

app.use(cors());

let mongoDB;
new MongoClient(process.env.DB_URL)
  .connect()
  .then((client) => {
    console.log("mongoDB 연결 성공");
    mongoDB = client.db("Fling");
    app.listen(8080, () => {
      console.log("http://localhost:8080 에서 서버 실행 중");
    });
  })
  .catch((err) => {
    console.log(err);
  });

const rule = new schedule.RecurrenceRule();
rule.minute = 10;
rule.tz = "Asia/Seoul";
const job = schedule.scheduleJob("*/1 * * * *", () => {
  console.log("매 1분마다 작업 시작");
  // grouping_delete();
});
