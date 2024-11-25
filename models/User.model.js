const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const EMAIL_PATTERN =
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const ROUNDS = 10

const REQUIRED_FIELD = 'Campo requerido'

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, REQUIRED_FIELD],
      unique: true,
      match: [EMAIL_PATTERN, 'Email incorrecto'],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, REQUIRED_FIELD],
      minLength: [8, "La contraseña debe tener 8 o más caracteres"],
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


// Evento que se produce antes de guardar un usuario en la BBDD
// IMPORTANTE: Tiene que ir antes del mongoose.model() sino, no lo utiliza
userSchema.pre("save", function (next) {
  const user = this;
  console.log('HASSSSSSH')

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

const User = mongoose.model('User', userSchema);

module.exports = User