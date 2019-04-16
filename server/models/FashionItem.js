const mongoose = require("mongoose");

const fashionItemSchema = new mongoose.Schema({
  url: {
    type: String
  },
  product_id: {
    type: String
  },
  brand: {
    type: String,
    trim: true
  },
  image: {
    type: String
  },
  product_title: {
    type: String,
    trim: true
  },
  gender: {
    type: String
  },
  price: {
    type: Number
  }
});

fashionItemSchema.index(
  {
    product_title: "text",
    brand: "text"
  },
  {
    weights: {
      product_title: 5,
      brand: 2
    }
  }
);

const FashionItem = mongoose.model("FashionItem", fashionItemSchema);

module.exports = FashionItem;
