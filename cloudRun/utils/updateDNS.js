const AWS = require("aws-sdk");

const accessKeyId = process.env.accessKeyId;
const secretAccessKey = process.env.secretAccessKey;
const hostedzoneId = process.env.hostedzoneId;

const updateDNS = async (ip) => {
  AWS.config.update({
    accessKeyId,
    secretAccessKey,
    region: "eu-central-1",
  });

  const route53 = new AWS.Route53();
  const res = await route53
    .changeResourceRecordSets({
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
    })
    .promise();

  console.log(res);
};

module.exports = updateDNS;
