const verificationCode = (req, res) => {
  if (req.method === 'GET') {
    let verificationCode = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    console.log(verificationCode);

    res.status(200).send(verificationCode);
  }
};

export default verificationCode;
