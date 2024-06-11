const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const sequelize = require('./server/config/database.js')
const { engine } = require('express-handlebars')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const initializePassport = require('./server/config/passport.js')

const userRoutes = require('./server/routes/userRoutes.js')
const petRoutes = require('./server/routes/petRoutes.js')
const locationRoutes = require('./server/routes/locationRoutes.js')
const commentRoutes = require('./server/routes/commentRoutes.js')
const authRoutes = require('./server/routes/authRoutes.js')

const app = express();
const PORT = process.env.PORT || 3000;

// configure handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars')

sequelize.sync({ force: false }) 
  .then(() => {
    console.log('Database synchronized with models.');
  })
  .catch(err => {
    console.error('Error synchronizing database with models:', err);
  });

// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))

// Express serving from 'public'
app.use(express.static(path.join(__dirname, 'public')))

// express session
// ******************************************************************************************************************************************************************************
// change secret below
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}))

// initialize passport
initializePassport(passport)
app.use(passport.initialize())
app.use(passport.session())

// connect flash
app.use(flash());

// global variables to use flash in all views
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  res.locals.user = req.user || null;
  next()
})

// mounting routes
app.use('/api/users', userRoutes)
app.use('/api/pets', petRoutes)
app.use('/api/locations', locationRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/auth', authRoutes)

// render register page
app.get('/register', (req, res) => {
  res.render('register', { title: 'Register' })
})

// render login page
app.get('/login', (req, res) => {
  res.render('login', { title: 'Login' })
})


app.get('/', (req, res) => {
  res.render('home', { title: 'Home', user: req.user})
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})