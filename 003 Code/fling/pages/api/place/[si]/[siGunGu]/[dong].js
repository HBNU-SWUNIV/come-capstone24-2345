import { connectDB } from '../../../../../util/database';

const handlerFoodieQuery = async (req, res) => {
  if (req.method === 'GET') {
    const { si, siGunGu, dong, category } = req.query;

    const client = await connectDB;
    const db = await client.db('Fling');

    if (si === '대전광역시') {
      const result = await db
        .collection('daejeon_foodie')
        .find({
          type: { $regex: category },
          'data.address': { $regex: `${si} ${siGunGu} ${dong}` },
        })
        .toArray();

      res.send([...new Set(result)]);
    }
  }
};

export default handlerFoodieQuery;
