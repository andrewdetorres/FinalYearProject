const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create the User schema
const UserSchema = new Schema({
  //All the fields that the user might have
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    required: true,
    default: Date.now()
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

//Export the Schema and set it to the variable User
module.exports = User = mongoose.model("users", UserSchema);
