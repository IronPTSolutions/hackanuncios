const mongoose = require('mongoose')
const User = require('../models/User.model')
const Product = require('../models/Product.model')
const CATEGORIES = require('../data/categories')

const { faker } = require('@faker-js/faker');

require('../config/db.config')

mongoose.connection.once('open', () => {
  mongoose.connection.dropDatabase()
    .then(() => {
      // Crear usuarios
      const data = Array(10).fill().map(() => {
        return {
          email: faker.internet.email(),
          password: '12345678',
          username: faker.internet.username(),
          phone: faker.phone.number,
          image: faker.image.avatar(),
        }
      })

      return User.create(data)
    })
    .then(usersCreated => {
      const productsToCreate = []

      usersCreated.forEach((user) => {
        const products = Array(10).fill().map(() => {
          return {
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            owner: user._id,
            price: Number(faker.commerce.price()),
            images: [faker.image.urlPicsumPhotos({ width: 500, height: 500 }), faker.image.urlPicsumPhotos({ width: 500, height: 500 }), faker.image.urlPicsumPhotos({ width: 500, height: 500 })],
            categories: CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)].value
          }
        })

        productsToCreate.push(...products)
      })

      return Product.create(productsToCreate)
    })
    .then(() => {
      return mongoose.connection.close();
    })
    .then(() => {
      console.log("Connection closed");
      process.exit(1);
    })
    .catch(err => {
      console.error(err)
      process.exit(0)
    })

})