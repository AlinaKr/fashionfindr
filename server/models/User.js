
const mongoose = require('mongoose');
require('mongoose-type-email');
mongoose.SchemaTypes.Email.defaults.message = 'Email address is invalid'
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 25,
    unique: true,
    trim: true,
    match: /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)$/
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  avatar: {
    type: String,
    default:
      "https://cdn1.iconfinder.com/data/icons/main-ui-elements-with-colour-bg/512/male_avatar-512.png"
  },
  favorites: [{ type: Schema.Types.ObjectId, ref: "FashionItem" }],
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: Schema.Types.ObjectId, ref: "User" }],
},
  {
    timestamps: true
  }
);

module.exports = User = mongoose.model('User', userSchema);