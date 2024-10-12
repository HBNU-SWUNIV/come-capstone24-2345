'use server';

import deleteAccountHandler from '@/hooks/deleteAccount';
import { connectDB } from '@/util/database';

const handleCert = async (isAllow, email) => {
  console.log(isAllow, email);
  const client = await connectDB;
  const db = await client.db('Fling');
  try {
    if (isAllow) {
      await db
        .collection('user_cred')
        .updateOne({ email: email }, { $set: { univCert: true } });
    } else {
      await deleteAccountHandler(email);
    }
  } catch (err) {
    return '서버 오류';
  }
};

export default handleCert;
