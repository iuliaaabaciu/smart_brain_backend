const express = require('express');
const cors = require('cors');
const knex = require('knex');
const { response } = require('express');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : 'postgresql-cubed-65778',
    user : 'postgres',
    password : 'toto',
    database : 'smartbrain'
  }
});

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
const bcrypt = require('bcrypt');

app.get('/', (req, res) => {
  res.send('it is working');
})

app.post('/signin', (req, res) => {
  signin.handleSignin(req, res, db, bcrypt)
});


app.post('/register', (req, res) => {
  register.handleRegister(req, res, db, bcrypt)
});

app.get('/profile/:id', (req, res) => {
  profile.handleGetProfile(req, res, db)
})

app.put('/image', (req, res) => {
  image.handleImage(req, res, db)
})

app.post('/imageurl', (req, res) => {
  image.handleApiCall(req, res)
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.nextTick.PORT}`);
});