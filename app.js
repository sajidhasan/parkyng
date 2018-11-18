const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');


//app init
const app = express();

//databse connect
mongoose.connect('mongodb://localhost/parkyng', { useNewUrlParser: true });
let db = mongoose.connection;
db.once('open', function(){
  console.log('MongoDB connection successfull!');
});

db.on('error', function(err){
  console.log(err);
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//set public folder
app.use(express.static(path.join(__dirname, 'public')));

//express session middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: true }
}));

//load views and view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', function(req, res){
  res.render('index');
});

app.get('/about', function(req, res){
  res.render('about');
});

app.get('/services', function(req, res){
  res.render('services');
});

app.get('/reviews', function(req, res){
  res.render('reviews');
});

app.get('/contact', function(req, res){
  res.render('contact');
});

app.get('/login', function(req, res){
  res.render('login');
});


//bring in CarOwner models

let CarOwner = require('./models/carOwner');

app.get('/car-signup', function(req, res){
  res.render('car-signup');
});

app.post('/car-signup', function(req, res){
  let carOwner = new CarOwner();
  carOwner.name = req.body.name;
  carOwner.email = req.body.email;
  carOwner.phone = req.body.phone;
  carOwner.address = req.body.address;
  carOwner.reg_no = req.body.car_reg_no;
  carOwner.model = req.body.car_model;

  carOwner.save(function(err){
    if(err){
      console.log(err);
    }else {
      console.log('******Car owner saved!');
      res.render('car-profile', {
        carOwner: carOwner
      });
    }
  });
});


app.get('/parking-signup', function(req, res){
  res.render('parking-signup');
});

let ParkingOwner = require('./models/parkingOwner');
app.post('/parking-signup', function(req, res){
  let parking = new ParkingOwner();
  parking.name = req.body.name;
  parking.email = req.body.email;
  parking.phone = req.body.phone;
  parking.address = req.body.address;
  parking.location = req.body.location;
  parking.num_spcae = req.body.num_spcae;
  parking.camera = req.body.camera;

  parking.save(function(err){
    if(err){
      console.log(err);
    }else{
      console.log('Parking owner saved!');
      res.render('/');
    }
  });
});

//listen to server
const port = 5000;
app.listen(port, function(){
  console.log('Server running on port ' + port);
});
