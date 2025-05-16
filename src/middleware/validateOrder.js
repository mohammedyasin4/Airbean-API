const db = require('../database/db');
// Middleware för att validera en order
function validateOrder(req, res, next) {

  if (!req.body) {
    return res.status(400).json({ error: "Request body is missing" });
  }


  if (!req.body.user_id || !req.body.items) {
    return res.status(400).json({
      error: "Missing required fields: user_id and items"
    });
  }

  const { user_id, items } = req.body;

  // Kollar att användaren finns i databasen
  db.get('SELECT user_id FROM Users WHERE user_id = ?', [user_id], (err, row) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!row) return res.status(400).json({ error: 'Invalid user_id' });


    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Invalid or empty items array' });
    }


    const menu = require('../menu.json');
    const validIds = menu.map(product => product.id);
    const isValid = items.every(item => validIds.includes(item.product_id));

    if (!isValid) {
      return res.status(400).json({ error: 'Invalid product_id in items' });
    }

    next();
  });
}

module.exports = validateOrder;