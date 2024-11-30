const mongoose = require('mongoose')

const REQUIRED_FIELD = 'Campo requerido'

const wishSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, REQUIRED_FIELD],
      ref: 'Product'
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, REQUIRED_FIELD],
      ref: 'User'
    },
  },
  {
    timestamps: true
  }
)

const Wish = mongoose.model('Wish', wishSchema)

module.exports = Wish