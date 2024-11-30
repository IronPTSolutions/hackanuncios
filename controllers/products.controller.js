const Product = require('../models/Product.model')
const CATEGORIES = require('../data/categories')
const mongoose = require('mongoose')

module.exports.list = (req, res, next) => {
  const { category, page } = req.query

  const PER_PAGE = 9
  const PAGE = Number(page) || 0
  const SKIP = PER_PAGE * PAGE

  const query = {}

  if (category) {
    query.categories = { $in: category }
  }

  // Para contar el número de resultados
  // Product.countDocuments({})

  Product.find(query).limit(PER_PAGE).skip(SKIP)
    .then(products => {
      const data = {
        products,
        categories: CATEGORIES,
        category,
        page: page,
        nextPage: PAGE + 1,
      }
    
      if (PAGE - 1 > 0) {
        data.prevPage = PAGE - 1
      }
      res.render('products/list', data)
    })
    .catch(err => next(err))
}

module.exports.getDetail = (req, res, next) => {
  const { id } = req.params

  console.log(req.currentUser.wishes)

  Product.findById(id)
    .populate('owner')
    .then(product => {
      if (!product) {
        return next({ status: 404, message: 'Product not found' })
      }

      res.render('products/detail', { product, isWished: req.currentUser.wishes.some(wish => wish.product.id.toString() === product.id.toString()) })
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

module.exports.delete = (req, res, next) => {
  Product.findByIdAndDelete(req.params.id)
    .then(() => res.redirect('/products'))
    .catch(err => next(err))
}