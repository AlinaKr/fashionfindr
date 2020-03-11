const mongoose = require("mongoose")

const CartSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  cart_items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FashionItem",
      quantity: Number
    }
  ],
  modifiedOn: {
    type: Date,
    default: Date.now
  },
  total: {
    quantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      default: 0,
    }
  }
},
  {
    timestamps: true
  }
)

const Cart = mongoose.model('Cart', CartSchema)
module.exports = Cart