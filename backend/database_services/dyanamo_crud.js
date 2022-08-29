const AWS = require("aws-sdk");
const fs = require("fs");

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const s3_upload = async (fileName) => {
  try {
    var fullpath =
      "C:/Users/divya/Desktop/Codes/cloudproject/rice-project/backend/public/images/rat/" +
      fileName;
    const fileContent = fs.readFileSync(fullpath);

    // Setting up S3 upload parameters
    const params = {
      Bucket: "rise-data-2022",
      Key: "data/demo/rat/images/" + fileName,
      Body: fileContent,
    };

    // Uploading files to the bucket
    s3.upload(params, function (err, data) {
      if (err) {
        // throw err;
        console.log("step 4")

        console.log(err);
        return 0;
      }
      console.log(`File uploaded successfully. ${data.Location}`);
      return 1;
    });
  } catch (error) {
    console.log(error);
    return 0;
  }
};

// AWS.config.update({
//   accessKeyId: process.env.ACCESS_KEY_ID,
//   secretAccessKey: process.env.SECRET_ACCESS_KEY,
//   region: process.env.REGION,
// });

// const docClient = new AWS.DynamoDB.DocumentClient();
// // console.log(docClient);

// const scanQuery = async (params) => {
//   docClient.scan(params, function (err, data) {
//     if (err) {
//       console.log(":error - " + JSON.stringify(err, null, 2));
//       return 0
//     } else {
//       console.log(data.Items);
//       return data.Items
//     }
//   });
// };

module.exports = { s3_upload };
