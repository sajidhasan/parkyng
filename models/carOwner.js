const mongoose = require('mongoose');

const CarOwnerSchema = mongoose.Schema({
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
  reg_no:{
    type: String,
    required: true
  },
  model:{
    type: String,
    required: true
  }
});

const CarOwner = module.exports = mongoose.model('CarOwner', CarOwnerSchema);
