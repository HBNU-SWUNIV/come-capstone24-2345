import admin from 'firebase-admin';

if (!admin.apps.length) {
  const serviceAccount = {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    privateKey: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PRIVATE_KEY?.replace(
      /\\n/g,
      '\n'
    ),
    clientEmail: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_EMAIL,
  };
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
const sendFCMHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { message, chatroomID } = req.body;
  }
};

export default sendFCMHandler;
