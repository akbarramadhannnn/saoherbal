const express = require("express");
const CronJob = require("cron").CronJob;
const axios = require("axios").default;
const moment = require("moment");
const { api } = require("./config/env");

const app = express();

const checkDueDateTransaction = new CronJob("0 1 * * *", async () => {
  console.log("You will see this message every 1am");
  try {
    const response = await axios.get(
      `${api.url_api_v1}/transaction/check-due-date-status`
    );
    console.log(
      "Check Due Date Transaction ->",
      `${response.data.message} ->`,
      moment(new Date()).format("YYYY-MM-DD H:mm:ss")
    );
  } catch (e) {
    console.log(
      "Error ->",
      `${e} ->`,
      moment(new Date()).format("YYYY-MM-DD H:mm:ss")
    );
  }
});

const addBillNumberEngineer = new CronJob("0 0 1 * *", async () => {
  console.log("You will see this message every new month");
  try {
    const response = await axios.post(`${api.url_api_v1}/bill`, {
      type: "engineer",
    });
    console.log(
      "Add Bill Number Engineer ->",
      `${response.data.message} ->`,
      moment(new Date()).format("YYYY-MM-DD H:mm:ss")
    );
  } catch (e) {
    console.log(
      "Error ->",
      `${e} ->`,
      moment(new Date()).format("YYYY-MM-DD H:mm:ss")
    );
  }
});

checkDueDateTransaction.start();
addBillNumberEngineer.start();

app.get("/", (req, res) => {
  res.status(200).json({ message: "Health Check Success" });
});

app.listen(1212, () => {
  console.log(`Scheduler listening on port 1212`);
});
