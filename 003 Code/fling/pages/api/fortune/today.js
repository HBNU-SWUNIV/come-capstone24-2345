import OpenAI from 'openai';
import { connectDB } from '../../../util/database';

const handleFortuneToday = async (req, res) => {
  if (req.method === 'POST') {
    let { gender, birth, mbti, datingType, email } = req.body;
    gender = gender === 'man' ? '남자' : '여자';
    const year = birth.year;
    const month = birth.month;
    const day = birth.day;
    mbti = mbti.type.join('');

    const fetchTodayFortuneData = async () => {
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
    // const oneDayMs = 24 * 60 * 60 * 1000;

    // const now = new Date();
    const userDoc = await db.collection('user_cred').findOne({ email });

    if (!userDoc.fortune) {
      const fortuneData = await fetchTodayFortuneData();
      const now = new Date();
      await db.collection('user_cred').updateOne(
        { email },
        {
          $set: {
            fortune: {
              date: {
                year: now.getFullYear(),
                month: now.getMonth() + 1,
                day: now.getDate(),
                hour: now.getHours(),
                min: now.getMinutes(),
              },
              content: fortuneData,
            },
          },
        }
      );
      res.status(200).send({
        content: fortuneData,
        date: {
          year: now.getFullYear(),
          month: now.getMonth() + 1,
          day: now.getDate(),
          hour: now.getHours(),
          min: now.getMinutes(),
        },
      });
    } else {
      const userDoc = await db.collection('user_cred').findOne({ email });
      res.status(200).send(userDoc.fortune);
    }

    //   if (userDoc.fortune) {
    //     const lastCheckDate = userDoc.fortune.date;

    //     if (now - lastCheckDate >= oneDayMs) {
    //       const fortuneData = await fetchTodayFortuneData();
    //       //업데이트
    //       await db.collection('user_cred').updateOne(
    //         { email },
    //         {
    //           $set: {
    //             fortune: {
    //               date: now,
    //               content: fortuneData,
    //             },
    //           },
    //         }
    //       );
    //       res.status(200).send({
    //         content: fortuneData,
    //         date: {
    //           year: now.getFullYear(),
    //           month: now.getMonth(),
    //           day: now.getDate(),
    //           hour: now.getHours(),
    //           min: now.getMinutes(),
    //         },
    //       });
    //     } else {
    //       //하루가 지나지 않음
    //       //기존 값 가져오기
    //       res.status(200).send({
    //         content: userDoc.fortune.content,
    //         date: {
    //           year: userDoc.fortune.date.getFullYear(),
    //           month: userDoc.fortune.date.getMonth(),
    //           day: userDoc.fortune.date.getDate(),
    //           hour: userDoc.fortune.date.getHours(),
    //           min: userDoc.fortune.date.getMinutes(),
    //         },
    //       });
    //     }
    //   }
    // } else {
    //   const fortuneData = await fetchTodayFortuneData();
    //   await db.collection('user_cred').updateOne(
    //     { email },
    //     {
    //       $set: {
    //         fortune: {
    //           date: now,
    //           content: fortuneData,
    //         },
    //       },
    //     }
    //   );
    //   res.status(200).send({
    //     content: fortuneData,
    //     date: {
    //       year: now.getFullYear(),
    //       month: now.getMonth(),
    //       day: now.getDate(),
    //       hour: now.getHours(),
    //       min: now.getMinutes(),
    //     },
    //   });
  }
};

export default handleFortuneToday;
