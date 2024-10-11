import axios from 'axios';

const deleteAccountHandler = async (userEmail) => {
  try {
    await axios.post('/api/delete/group', { email: userEmail });
    await axios.post('/api/delete/profile', { email: userEmail });
    await axios.post('/api/delete/images', { email: userEmail });
    await axios.post('/api/delete/chat', { email: userEmail });
    await axios.post('/api/delete/cred', { email: userEmail });
  } catch (err) {
    alert(err.response.data);
  }
};

export default deleteAccountHandler;
