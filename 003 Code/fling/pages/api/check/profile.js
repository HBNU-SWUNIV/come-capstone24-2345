import aws from 'aws-sdk';

const handleCheckProfile = async (req, res) => {
  aws.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.AWS_S3_BUCKET_REGION,
    signatureVersion: 'v4',
  });

  const s3 = new aws.S3();
  const url = await s3.createPresignedPost({
    Bucket: process.env.S3_BUCKET_NAME,
    Fields: { key: req.query.file },
    Expires: 60, //seconds
    Conditions: [
      ['content-length-range', 0, 1048576], // 파일용량 1MB 까지 제한
    ],
  });

  res.status(200).json(url);
};

export default handleCheckProfile;
