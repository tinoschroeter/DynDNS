"use strict";

const getIP = (collection) => {
  return (req, res) => {
    collection
      .findOne({}, { sort: { $natural: -1 } })
      .then((result) => {
        res.json({ addr: result });
      })
      .catch((e) => {
        console.error(e);
        res.status(500).end();
      });
  };
};

module.exports = getIP;
