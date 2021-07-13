// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category

Product.belongsTo(Category, {
  through: {
    foreignKey: 'category_id',
  },

  as: 'products_tag'
});

// Categories have many Products

// Products belongToMany Tags (through ProductTag)

Product.belongsToMany(Tags, {
  through: {
    model: ProductTag,
    unique: false
  }
});

// Tags belongToMany Products (through ProductTag)

Tag.belongsToMany(Products, {
  through: {
    model: ProductTag,
    unique: false
  }
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};