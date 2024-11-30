const mongoose = require('mongoose')
const CATEGORIES = require('../data/categories')

const REQUIRED_FIELD = 'Campo requerido'

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, REQUIRED_FIELD]
    },
    description: {
      type: String,
      required: [true, REQUIRED_FIELD]
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, REQUIRED_FIELD],
      ref: 'User'
    },
    price: {
      type: Number,
      required: [true, REQUIRED_FIELD],
    },
    images: {
      type: [String],
      required: [true, REQUIRED_FIELD],
    },
    categories: {
      type: [String],
      enum: CATEGORIES.map(category => category.value),
      required: [true, REQUIRED_FIELD],
    }
  },
  {
    timestamps: true
  }
)

const Product = mongoose.model('Product', productSchema)

module.exports = Product