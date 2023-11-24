const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isTempPassword: { type: Boolean, required: true },
  id_box: { type: Number, required: true, unique: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);