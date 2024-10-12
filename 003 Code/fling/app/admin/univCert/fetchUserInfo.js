'use server';

import { connectDB } from '@/util/database';

const fetchUserInfo = async () => {
  const client = await connectDB;
  const db = await client.db('Fling');

  const userDocs = await db
    .collection('user_cred')
    .find({ univCert: false })
    .toArray();

  if (userDocs.length !== 0) {
    const result = userDocs.map((doc) => {
      return {
        email: doc.email,
        gender: doc.gender === 'man' ? '남' : '여',
        name: doc.name,
        birth: doc.birth,
        univ: doc.univ,
        department: doc.department,
        profileImg: doc.profileImg,
        univCert: doc.univCert,
      };
    });

    return result;
  } else {
    return '결과 없음';
  }
};

export default fetchUserInfo;
