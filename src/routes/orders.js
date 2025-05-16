const express = require('express');
const router = express.Router();
const db = require('../database/db');
const validateOrder = require('../middleware/validateOrder');

// skapar en ny order
router.post('/', validateOrder, (req, res) => {
  const { user_id, items } = req.body;

  // Beräknar det totala priset
  const menu = require('../menu.json');
  let total = 0;
  items.forEach(item => {
    const product = menu.find(p => p.id === item.product_id);
    total += product.price * item.quantity;
  });

  // sparar order i databasen
  db.run(
    'INSERT INTO Orders (user_id, total_price) VALUES (?, ?)',
    [user_id, total],
    function (err) {
      if (err) return res.status(500).json({ error: 'Database error' });

      const orderId = this.lastID;

      //  Sparar alla orderdetaljer i OrderItems-tabellen
      items.forEach(item => {
        db.run(
          'INSERT INTO OrderItems (order_id, product_id, quantity) VALUES (?, ?, ?)',
          [orderId, item.product_id, item.quantity]
        );
      });
      //  Skickar tillbaka order id
      res.status(201).json({ order_id: orderId });
    }
  );
});

module.exports = router;