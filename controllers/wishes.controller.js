const Wish = require('../models/Wish.model');

module.exports.handle = (req, res, next) => {
  const { productId } = req.params
  const { id: userId } = req.currentUser
  // Ver si existe un wish para ese producto y ese usuario
  Wish.findOne({ product: productId, user: userId })
    .then(wish => {
      console.log(wish)
      if (!wish) {
        const payload = {
          product: productId,
          user: req.currentUser.id
        }

        return Wish.create(payload)
      } else {
        return Wish.deleteOne({ _id: wish.id })
      }
    })
    .then(() => {
      res.redirect(`/products/${productId}`)
    })
    .catch(err => next(err))
}