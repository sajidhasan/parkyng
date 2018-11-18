const mongoose = require('mongoose');

const ParkingOwnerSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  phone:{
    type: String,
    required: true
  },
  address:{
    type: String,
    required: true
  },
  area:{
    type: String,
    required: true
  },
  num_spcae:{
    type: String,
    required: true
  },
  camera:{
    type: String,
    required: true
  }
});

const ParkingOwner = module.exports = mongoose.model('ParkingOwner', ParkingOwnerSchema);
