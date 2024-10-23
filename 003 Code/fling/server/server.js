const next = require("next");
const express = require("express");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const admin = require("firebase-admin");
const https = require("https");
const fs = require("fs");
const { parse } = require("url");
const path = require("path");

const options = {
  key: fs.readFileSync(path.join(__dirname, "../localhost-key.pem"), "utf-8"),
  cert: fs.readFileSync(path.join(__dirname, "../localhost.pem"), "utf-8"),
};

dotenv.config();
admin.initializeApp({
  credential: admin.credential.cert(
    JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_ADMIN)
  ),
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
});
const firebaseDB = admin.firestore();
const firebaseStorage = admin.storage().bucket();

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  let mongoDB;
  new MongoClient(process.env.DB_URL)
    .connect()
    .then((client) => {
      console.log("mongoDB 연결 성공");
      mongoDB = client.db("Fling");
      // cronJob();
    })
    .catch((err) => {
      console.log(err);
    });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  if (process.env.NODE_ENV === "production") {
    server.listen(port, (err) => {
      if (err) throw err;
      console.log("> Ready on http://localhost:", port);
    });
  } else {
    https
      .createServer(options, async (req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
      })
      .listen(port + 1, (err) => {
        if (err) throw err;
        console.log("> Ready on https://localhost:", port + 1);
      });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log("> Ready on http://localhost:", port);
    });
  }
});
