const mongoose = require('mongoose')
const User = require('../models/User.model')

module.exports.create = (req, res, next) => {
  res.render('users/register')
}

module.exports.doCreate = (req, res, next) => {
  User.create(req.body)
    .then(() => {
      res.redirect('/')
    })
    .catch(error => {
      // Para autorellenar el formulario cuando haya errores, pasamos todos los valores del req.body, menos la password
      const values = {...req.body}
      delete values.password

      if (error instanceof mongoose.Error.ValidationError) {
        res.render('users/register', {
          errors: error.errors,
          values
        })
      } else if (error.code && error.code === 11000) {
        const errors = {}

        if (error.keyValue.email) {
          errors.email = 'Ya existe un usuario con este email'
        }

        if (error.keyValue.username) {
          errors.username = 'Ya existe un usuario con este nombre'
        }

        res.render('users/register', { errors, values })
      } else {
        next(error)
      }

    })
}