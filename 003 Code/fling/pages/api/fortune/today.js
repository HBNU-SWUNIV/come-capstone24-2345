import OpenAI from 'openai';
import { connectDB } from '../../../util/database';

const handleFortuneToday = async (req, res) => {
  if (req.method === 'POST') {
    const gender = req.body.gender === 'man' ? '남자' : '여자';
    const year = req.body.birth.year;
    const month = req.body.birth.month;
    const day = req.body.birth.day;
    const mbti = req.body.mbti.type.join('');
    const datingType = req.body.datingType.type;
    const email = req.body.email;

    const fetchFortuneData = async () => {
      const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY });

      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo-0125',
        messages: [
          {
            role: 'system',
            content: process.env.NEXT_PUBLIC_OPENAI_SYSTEM_CONTENT,
          },
          {
            role: 'user',
            content: `${gender}, ${year}년 ${month}월 ${day}일생, ${mbti}, ${datingType}`,
          },
        ],
        temperature: 0.57,
        max_tokens: 550,
      });

      return completion.choices[0].message.content;
    };

    const client = await connectDB;
    const db = await client.db('Fling');

    const now = new Date();

    const userDoc = await db.collection('user_cred').findOne({ email });

    if (userDoc.fortune) {
      const lastCheckDate = userDoc.fortune.date;
      if (lastCheckDate < now && lastCheckDate.getDate() !== now.getDate) {
        const data = await fetchFortuneData();
        await db.collection('user_cred').updateOne(
          { email },
          {
            $set: {
              fortune: {
                date: now,
                content: data,
              },
            },
          }
        );
        res.status(200).send({
          content: data,
          date: {
            year: now.getFullYear(),
            month: now.getMonth(),
            day: now.getDate(),
            hour: now.getHours(),
            min: now.getMinutes(),
          },
        });
      } else {
        res.status(200).send({
          content: userDoc.fortune.content,
          date: {
            year: userDoc.fortune.date.getFullYear(),
            month: userDoc.fortune.date.getMonth(),
            day: userDoc.fortune.date.getDate(),
            hour: userDoc.fortune.date.getHours(),
            min: userDoc.fortune.date.getMinutes(),
          },
        });
      }
    } else {
      const data = await fetchFortuneData();
      await db.collection('user_cred').updateOne(
        { email },
        {
          $set: {
            fortune: {
              date: now,
              content: data,
            },
          },
        }
      );

      res.status(200).send({
        content: data,
        date: {
          year: now.getFullYear(),
          month: now.getMonth(),
          day: now.getDate(),
          hour: now.getHours(),
          min: now.getMinutes(),
        },
      });
    }
  }
};

export default handleFortuneToday;
