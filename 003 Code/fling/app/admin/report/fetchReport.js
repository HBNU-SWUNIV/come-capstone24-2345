'use server';

import { connectDB } from '@/util/database';

const fetchReport = async () => {
  const client = await connectDB;
  const db = await client.db('Fling');

  try {
    const docs = await db.collection('report').find({}).toArray();
    const result = docs.map((doc) => {
      return {
        email: doc.author,
        options: doc.options,
        etc: doc.etc,
        date: doc.date,
      };
    });
    return result;
  } catch (err) {
    return err;
  }
};

export default fetchReport;
