const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const EMAIL_PATTERN =
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const ROUNDS = 10

const REQUIRED_FIELD = 'Required field'

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, REQUIRED_FIELD],
      unique: true,
      match: [EMAIL_PATTERN, 'Email is invalid'],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minLength: [8, "Password must be 8 characters or longer"],
    },
    username: {
      type: String,
      required: [true, REQUIRED_FIELD],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, REQUIRED_FIELD]
    },
  },
  {
    timestamps: true
  }
)

const User = mongoose.model('User', userSchema);

// Evento que se produce antes de guardar un usuario en la BBDD
userSchema.pre("save", function (next) {
  const user = this;

  // Antes de guardar, compruebo si tengo que hashear la contraseña, si su campo ha sido modificado o es nuevo
  if (user.isModified("password")) {
    bcrypt.hash(user.password, ROUNDS).then((hash) => {
      user.password = hash;
      next();
    });
  } else {
    next();
  }
});

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = User