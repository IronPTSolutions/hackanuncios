const Product = require('../models/Product.model')
const CATEGORIES = require('../data/categories')
const mongoose = require('mongoose')

module.exports.list = (req, res, next) => {
  res.render('products/list')
}

module.exports.getDetail = (req, res, next) => {
  const { id } = req.params

  Product.findById(id)
    .populate('owner')
    .then(product => {
      if (!product) {
        return next({ status: 404, message: 'Product not found' })
      }

      res.render('products/detail', { product })
    })
    .catch(error => next(error))
}

module.exports.create = (req, res, next) => {
  res.render('products/form', { categories: CATEGORIES })
}

module.exports.doCreate = (req, res, next) => {
  req.body.owner = req.currentUser.id
  if (req.files) {
    req.body.images = req.files.map(file => file.path)
  }

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