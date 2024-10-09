import { connectDB } from '../../../util/database';

const handleEditInfo = async (req, res) => {
  if (req.method === 'POST') {
    const { info } = req.body;

    const MBTIType = {
      ISTJ: '신뢰할 수 있고 책임감이 강한 사람',
      ISFJ: '진실되고 헌신적인 사람',
      INFJ: '복잡한 내적 생각과 감정의 세계를 가지고 있는 사람',
      INTJ: '깊은 통찰력과 전략적 사고 능력을 갖추고 있는 사람',
      ISTP: '현실적이며, 분석적으로 접근하는 사람',
      ISFP: '삶의 순간들을 소중하게 여기며, 현실적이면서도 주변 환경과 조화를 이루려고 노력하는 사람',
      INFP: '이상주의적이며, 깊은 가치관과 성실성을 가지고 있는 사람',
      INTP: '본질적으로 분석가이며, 끊임없이 새로운 아이디어와 이론을 탐색하는 사람',
      ESTP: '현재 순간을 즐기고, 실제 경험을 중시하는 사람',
      ESFP: '현재 순간을 즐기며, 주변 환경과 사람들에게 열린 사람',
      ENFP: '열정적이며 창의적이고, 가능성을 탐구하는 데 큰 흥미를 갖는 사람',
      ENTP: '창의적이고 지적 호기심이 많은 사람',
      ESTJ: '실질적이고 조직적인 성격을 가진 사람',
      ESFJ: '협조적이고 따뜻하며, 타인의 느낌과 필요에 민감하게 반응하는 사람',
      ENFJ: '따뜻하고 통찰력 있으며, 타인의 감정과 필요에 깊게 공감하는 사람',
      ENTJ: '리더십이 뛰어나고 계획적이며, 효율성을 추구하는 사람',
    };

    const client = await connectDB;
    const db = await client.db('Fling');

    await db.collection('user_cred').updateOne(
      { email: info.email },
      {
        $set: {
          height: info.height,
          religion: info.religion,
          mbti: {
            type: info.mbti.type,
            description: MBTIType[info.mbti.type.join('')],
          },
          smoking: info.smoking,
          drinkLimit: info.drinkLimit,
        },
      }
    );
    res.status(200).send({
      height: info.height,
      religion: info.religion,
      mbti: {
        type: info.mbti.type,
        description: MBTIType[info.mbti.type.join('')],
      },
      smoking: info.smoking,
      drinkLimit: info.drinkLimit,
    });
  }
};

export default handleEditInfo;
