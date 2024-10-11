import { deleteObject, listAll, ref } from 'firebase/storage';
import { storage } from '../../../firebase/firebaseDB';

const handleDeleteProfile = async (req, res) => {
  if (req.method === 'POST') {
    const { email } = req.body;

    const profileListRef = ref(storage, `images/profile`);

    try {
      const list = await listAll(profileListRef);

      try {
        list.items.forEach(async (itemRef) => {
          if (itemRef.name.startsWith(email)) {
            await deleteObject(itemRef);
          }
        });

        res.status(200).send('프로필사진이 삭제되었습니다');
      } catch (error) {
        res.status(500).send('삭제중 오류가 발생했습니다: ' + err);
      }
    } catch (err) {
      res.status(500).send('리스트를 로드하는 중 오류가 발생했습니다: ' + err);
    }
  }
};

export default handleDeleteProfile;
