const Product = require('../models/Product.model')
const CATEGORIES = require('../data/categories')
const mongoose = require('mongoose')

module.exports.list = (req, res, next) => {
  res.render('products/list')
}

module.exports.getDetail = (req, res, next) => {
  const { id } = req.params

  res.render('products/detail')
}

module.exports.create = (req, res, next) => {
  res.render('products/form', { categories: CATEGORIES })
}

module.exports.doCreate = (req, res, next) => {
  console.log(req.body)
  req.body.owner = req.currentUser.id

  Product.create(req.body)
    .then((productCreated) => {
      res.redirect(`/products/${productCreated.id}`)
    })
    .catch(err => {
      if (err instanceof mongoose.Error.ValidationError) {
       next(err )
      } else {
        next(err)
      }
    })
}