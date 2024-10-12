'use server';

import { connectDB } from '@/util/database';

const submitReply = async (email, title, date, reply) => {
  const client = await connectDB;
  const db = await client.db('Fling');

  try {
    await db.collection('inquiry').updateOne(
      { email: email, title: title, date: date },
      {
        $set: {
          reply: {
            content: reply,
            date: new Date(),
          },
        },
      }
    );
  } catch (err) {
    return err;
  }
};

export default submitReply;
