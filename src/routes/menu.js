const express = require('express');
const router = express.Router();
// Laddar menyn från  JSON-file
const menu = require('../menu.json');

// Når någon går till /menu skickar vi hela menyn som JSON
router.get('/', (req, res) => {
  res.json(menu);
});

module.exports = router;