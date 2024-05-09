const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path')
const sequelize = require('./server/config/database.js')

const userRoutes = require('./server/routes/userRoutes.js')
const petRoutes = require('./server/routes/petRoutes.js')

const PORT = process.env.PORT || 3000;

sequelize.sync({ force: false }) 
  .then(() => {
    console.log('Database synchronized with models.');
  })
  .catch(err => {
    console.error('Error synchronizing database with models:', err);
  });

// middleware
app.use(bodyParser.json())

// Express serving index.html from 'public'
app.use(express.static(path.join(__dirname, 'public')))

// mounting routes
app.use('/api/users', userRoutes)
app.use('/api/pets', petRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})