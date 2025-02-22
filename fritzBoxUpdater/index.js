const xml2js = require("xml2js");
const updateDNS = require("./updateDNS");
let logState = 0;

const fritzBox = process.env.FRITZ_BOX || "10.0.1.1";
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
    });
};

const getExternalIPAddress = async () => {
  const soapData = `<?xml version="1.0" encoding="utf-8"?>
  <s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/" s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
    <s:Body>
      <u:GetExternalIPAddress xmlns:u="urn:schemas-upnp-org:service:WANIPConnection:1"/>
    </s:Body>
  </s:Envelope>`;

  const url = `http://${fritzBox}:49000/igdupnp/control/WANIPConn1`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": 'text/xml; charset="utf-8"',
      SOAPACTION:
        "urn:schemas-upnp-org:service:WANIPConnection:1#GetExternalIPAddress",
    },
    body: soapData,
  };

  try {
    const response = await fetch(url, options);
    const xmlResponse = await response.text();

    xml2js.parseString(xmlResponse, (err, result) => {
      if (err) {
        console.error("Error parsing XML:", err);
        return;
      }

      const now = new Date();
      const ipAdress =
        result["s:Envelope"]["s:Body"][0]["u:GetExternalIPAddressResponse"][0][
          "NewExternalIPAddress"
        ][0];

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
    });
  } catch (error) {
    console.error("Fetch Error:", error);
  }
};

//getExternalIPAddress();
//setInterval(getExternalIPAddress, 10_000);

getExternalIPAddressAPI();
setInterval(getExternalIPAddressAPI, 10_000);
