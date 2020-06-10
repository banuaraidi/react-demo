const db = require('../persistence');

module.exports = async (req, res) => {
  const dataChanges = {completed: req.body.completed ? 1 : 0}; 
  const { rows } = await db.updateItem(req.params.id, dataChanges);
  res.send(rows[0]);
};
