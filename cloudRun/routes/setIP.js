"use strict";
const sendMessageToSlackChannel = require("../utils/sendMessageToSlackChannel");
const updateDNS = require("../utils/updateDNS");
const net = require("net");

const setIP = () => {
  return (req, res) => {
    const ip =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress.toString().replace("::ffff:", "");

    if (net.isIPv4(ip)) {
      const channelName = "#dyndns";
      sendMessageToSlackChannel(`Deine neue IP ist: ${ip}`, channelName);
      updateDNS(ip).catch((err) => console.error(err));
      console.log(`update ip to ${ip}`);

      res.status(200).json({ message: `${ip} updated` });
    }
  };
};

module.exports = setIP;
