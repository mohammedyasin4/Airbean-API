const express = require('express');
// skapar en express app
const app = express();
const port = 3000;


app.use(express.json());

// Importerar route-filer 
const userRoutes = require('./routes/users');
const orderRoutes = require('./routes/orders');
const menuRoutes = require('./routes/menu');

// Kopplar ihop routes med pathes:
app.use('/users', userRoutes);
app.use('/orders', orderRoutes);
app.use('/menu', menuRoutes);

// Startar serven och lyssnar på port
app.listen(port, () => {
  console.log("Server running on http://localhost:" + port);
});