const db = require('../persistence');

module.exports = async (req, res) => {
  const data = {
    name: req.body.name,
    completed: false,
  };

  const { rows } = await db.storeItem(data);
  res.send(rows[0]);
};
