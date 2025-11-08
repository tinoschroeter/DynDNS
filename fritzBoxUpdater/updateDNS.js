const { Route53 } = require("@aws-sdk/client-route-53");

const accessKeyId = process.env.accessKeyId;
const secretAccessKey = process.env.secretAccessKey;
const hostedzoneId = process.env.hostedzoneId;

const updateDNS = async (ip) => {
  const route53 = new Route53({
    credentials: {
      accessKeyId,
      secretAccessKey,
    },

    region: "eu-central-1",
  });
  try {
    const tino = await route53.changeResourceRecordSets({
      HostedZoneId: `/hostedzone/${hostedzoneId}`,
      ChangeBatch: {
        Changes: [
          {
            Action: "UPSERT",
            ResourceRecordSet: {
              Name: "tino.sh.",
              Type: "A",
              TTL: 30,
              ResourceRecords: [{ Value: ip }],
            },
          },
        ],
      },
    });
    console.log(tino);

    return ip;
  } catch (err) {
    console.error(err);

    return err;
  }
};

module.exports = updateDNS;
