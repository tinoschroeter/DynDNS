"use strict";
const sendMessageToSlackChannel = require("../utils/sendMessageToSlackChannel");
const updateDNS = require("../utils/updateDNS");

const { format } = require("date-fns");

const setIP = (collection) => {
  return (req, res) => {
    const ip =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress.toString().replace("::ffff:", "");

    console.log("ip: ", ip);
    collection
      .findOne({}, { sort: { $natural: -1 } })
      .then((result) => {
        if (result.ip !== ip) {
          collection
            .insertOne({ ip: ip, date: format(new Date(), "dd/MM/yyyy-HH:mm") })
            .then(() => {
              const channelName = "#dyndns";
              sendMessageToSlackChannel(
                `Deine neue IP ist: ${ip}`,
                channelName
              );
              console.log("update ip...");
              res.status(201).json({ message: `${ip} added to database` });

              updateDNS(ip).catch((err) => console.error(err));
            });
        } else {
          res.status(200).json({ message: `${result.ip} no ip change` });
        }
      })
      .catch((e) => {
        console.error(e);
        res.status(500).end();
      });
  };
};

module.exports = setIP;
