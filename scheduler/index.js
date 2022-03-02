const express = require("express");
const CronJob = require("cron").CronJob;
const axios = require("axios").default;

const app = express();

const job = new CronJob("0 1 * * *", function () {
  console.log("You will see this message every 1am");
});

const job1 = new CronJob("0 0 1 * *", function () {
  console.log("You will see this message every new month");
});

job.start();
job1.start();

app.get("/", (req, res) => {
  res.status(200).json({ message: "Health Check Success" });
});

app.listen(1212, () => {
  console.log(`Scheduler listening on port 1212`);
});
