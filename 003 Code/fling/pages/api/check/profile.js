const handleCheckProfile = (req, res) => {
  if (req.method == 'POST') {
    res.status(200).send(req.body);
  }
};

export default handleCheckProfile;
