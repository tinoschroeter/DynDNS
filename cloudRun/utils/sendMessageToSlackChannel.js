"use strict";

const axios = require("axios");
const slackToken = process.env.SLACK_TOKEN;
const url = "https://slack.com/api/chat.postMessage";

const sendMessageToSlackChannel = (message, channel) => {
  axios
    .post(
      url,
      {
        channel: channel,
        text: message,
      },
      { headers: { authorization: `Bearer ${slackToken}` } }
    )
    .then((result) => {
      console.log("Done", result.data);
    })
    .catch((e) => {
      console.error(e);
    });
};

module.exports = sendMessageToSlackChannel;
