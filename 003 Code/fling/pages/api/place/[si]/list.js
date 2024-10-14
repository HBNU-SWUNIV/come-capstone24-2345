import { connectDB } from '@/util/database';

const handlePlaceList = async (req, res) => {
  if (req.method === 'POST') {
    const { si } = req.query;

    const client = await connectDB;
    const db = await client.db('Fling');

    if (si === '대전광역시') {
      const result = await db
        .collection('daejeon_place')
        .aggregate([
          {
            $project: {
              gu: {
                $regexFind: {
                  input: '$data.address',
                  regex: /([가-힣]+구)/, // 구 추출
                },
              },
              dong: {
                $regexFind: {
                  input: '$data.address',
                  regex: /([가-힣]+동)/, // 동 추출
                },
              },
            },
          },
          {
            $group: {
              _id: '$gu.match', // 구로 그룹화
              dong: { $addToSet: '$dong.match' }, // 해당 구에 속한 동들을 배열로 모음
            },
          },
        ])
        .toArray();

      const sigungu = {};
      result.forEach((element) => {
        sigungu[element._id] = element.dong;
      });

      res.status(200).send(sigungu);
    } else {
      res.status(404).send('검색된 결과가 없습니다');
    }
  }
};

export default handlePlaceList;
