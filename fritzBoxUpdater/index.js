const updateDNS = require("./updateDNS");
let logState = 0;
let oldIp = "127.0.1.1";

const getExternalIPAddressAPI = async () => {
  fetch("https://api.ipify.org?format=json")
    .then((result) => result.json())
    .then((data) => {
      const ipAdress = data.ip;

      const now = new Date();
      if (oldIp !== ipAdress) {
        updateDNS(ipAdress).then((ip) => {
          oldIp = ip;
        });
        logState = 0;
        console.log(`${now}: Update to IP: ${ipAdress}`);
      } else if (logState === 0) {
        logState = 1;
        console.log(`${now}: No updates are available for IP: ${ipAdress}`);
      }
    })
    .catch((error) => {
      console.error(
        `${new Date()}: Failed to fetch IP from ipify API:`,
        error.message,
      );
    });
};

getExternalIPAddressAPI();
setInterval(getExternalIPAddressAPI, 10_000);
