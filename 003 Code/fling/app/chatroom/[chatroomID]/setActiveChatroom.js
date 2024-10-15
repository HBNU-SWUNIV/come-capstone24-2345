'use server';

import { connectDB } from '@/util/database';

const setActiveChatroom = async (email, bool) => {
  console.log(email, bool);
  //   const client = await connectDB()
  //   const client = await connectDB;
  //   const db = await client.db('Fling');

  //   await db
  //     .collection('user_cred')
  //     .updateOne({ email }, { $set: { activeChatroom: bool } });
};

export default setActiveChatroom;
