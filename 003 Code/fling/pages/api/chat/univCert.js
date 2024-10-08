import { connectDB } from '../../../util/database';

const handleUnivCert = async (req, res) => {
  if (req.method === 'POST') {
    const { userEmail, otherEmail } = req.body;

    const client = await connectDB;
    const db = await client.db('Fling');

    if (userEmail && otherEmail) {
      const userDoc = await db
        .collection('user_cred')
        .findOne({ email: userEmail });
      const otherDoc = await db
        .collection('user_cred')
        .findOne({ email: otherEmail });
      const userUnivCert = userDoc.univCert;
      const otherUnivCert = otherDoc.univCert;
      res.status(200).send({ userUnivCert, otherUnivCert });
    } else if (userEmail && !otherEmail) {
      const userDoc = await db
        .collection('user_cred')
        .findOne({ email: userEmail });
      const userUnivCert = userDoc.univCert;
      res.status(200).send({ userUnivCert });
    } else {
      res.status(500).send('잠시 후에 다시 시도해주세요');
    }
  }
};

export default handleUnivCert;
