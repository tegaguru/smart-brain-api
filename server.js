const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const app = express();
const bcrypt = require('bcrypt');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile');

app.use(bodyParser.json());
app.use(cors())
const knex = require('knex');
const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'mgwtgh0101',
        database: 'smartbrain'
    }
});
//homepage endpoint
app.get('/', (req,res)=>{
    res.send('it is working!')
})
//Sign In endpoint 
app.post('/signin', (req, res)=>{signin.handleSignIn(req, res, db, bcrypt)})
//register endPoint
app.post('/register', (req,res)=>{register.handleRegister(req, res, db, bcrypt)})
//profile endpoint
app.get('/profile/:id', (req, res)=> {profile.handleProfile(req, res, db)})

//image submission endpoint
app.put('/image', (req, res)=>{ image.handleImage(req, res, db)})
app.post('/imageurl', (req, res)=>{ image.handleApiCall(req, res)})

app.listen(3000);