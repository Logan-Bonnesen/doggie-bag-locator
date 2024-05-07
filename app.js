const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const sequelize = require('./server/config/database.js')

const userRoutes = require('./server/routes/userRoutes.js')


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

app.get('/', (req, res) => {
    res.send('123456')
})

// mounting routes
app.use('/api/users', userRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})