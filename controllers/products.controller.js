module.exports.list = (req, res, next) => {
  res.render('products/list')
}

module.exports.getDetail = (req, res, next) => {
  const { id } = req.params

  res.render('products/detail')
}

module.exports.create = (req, res, next) => {
  res.render('products/form')
}

module.exports.doCreate = (req, res, next) => {
  res.render('products/form')
}