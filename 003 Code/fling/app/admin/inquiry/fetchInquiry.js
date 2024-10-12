'use server';

const { connectDB } = require('@/util/database');

const fetchInquiry = async () => {
  const client = await connectDB;
  const db = await client.db('Fling');

  try {
    const docs = await db.collection('inquiry').find({}).toArray();
    const result = docs
      .filter((doc) => !doc.reply.content && !doc.reply.date)
      .map((doc) => {
        return {
          email: doc.email,
          nickname: doc.nickname,
          title: doc.title,
          content: doc.content,
          date: doc.date,
          reply: doc.reply,
        };
      });

    return result;
  } catch (err) {
    return '서버 오류';
  }
};

export default fetchInquiry;
