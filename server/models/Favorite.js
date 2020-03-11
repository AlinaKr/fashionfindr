const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  fashion_item: { type: mongoose.Schema.ObjectId, required: true, ref: "FashionItem" },
  users_favorites: [
    {
      owner: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User"
      }
    }
  ]
});

const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = Favorite;