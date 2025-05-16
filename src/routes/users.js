const express = require('express');
const router = express.Router();
// Hämtar en funktion för att generera unika ID
const { v4: uuidv4 } = require('uuid');
const db = require('../database/db');

// Skapa en ny användare
router.post('/', (req, res) => {
  const userId = uuidv4();
  db.run('INSERT INTO Users (user_id) VALUES (?)', [userId], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to create user' });
    }
    else res.status(201).json({ user_id: userId });
  });
});
// gör denna path tillgänglig till resten av appen  
module.exports = router;