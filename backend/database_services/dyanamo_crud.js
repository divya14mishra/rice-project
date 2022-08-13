const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION,
});

const docClient = new AWS.DynamoDB.DocumentClient();
// console.log(docClient);

const scanQuery = async (params) => {
  docClient.scan(params, function (err, data) {
    if (err) {
      console.log(":error - " + JSON.stringify(err, null, 2));
      return 0
    } else {
      console.log(data.Items);
      return data.Items
    }
  });
};

module.exports = {scanQuery};