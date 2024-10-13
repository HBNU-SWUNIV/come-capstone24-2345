import { db } from '@/firebase/firebaseDB';
import {
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
  where,
} from 'firebase/firestore';

const fetchChatLogs = async (req, res) => {
  if (req.method === 'POST') {
    const { email, date } = req.body;
    const reportDate = new Date(date);

    try {
      const chatroomsRef = collection(db, 'chatrooms');
      const q = query(chatroomsRef, where('member', 'array-contains', email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.docs.forEach(async (doc) => {
          const messagesRef = collection(doc.ref, 'messages');
          const q = query(
            messagesRef,
            where(
              'date',
              '<',
              Timestamp.fromDate(reportDate),
              orderBy('date', 'asc')
            )
          );
          const messagesSnapshot = await getDocs(q);

          const chatData = [];
          if (!messagesSnapshot.empty) {
            messagesSnapshot.forEach((doc) => {
              chatData.push(doc.data());
            });
          }

          return res.status(200).send(chatData);
        });
      } else {
        return res.status(404).send('해당 유저의 채팅방이 존재하지 않습니다');
      }
    } catch (err) {
      return res.status(500).send('서버 오류: ' + err);
    }
  }
};

export default fetchChatLogs;
