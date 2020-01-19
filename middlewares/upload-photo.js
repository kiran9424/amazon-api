const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const dotenv = require('dotenv')
dotenv.config();

aws.config.update({
    secretAccessKey: process.env.AWSSecretKey,
    accessKeyId: process.env.AWSAccessKeyId
});

const awsS3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: awsS3,
        bucket: 'amazon-api-clone-v1',//aws s3 bucket name
        acl: 'public-read',
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            cb(null, Date.now().toString())
        }
    })
})

module.exports = upload;