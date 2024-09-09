const messageHandler = (req, res) => {
  const docData = req.body.messages;
  if (req.method === 'POST') {
    if (docData.message !== '') {
      res.send(docData);
    } else {
      res.end();
    }
  }
};

export default messageHandler;
