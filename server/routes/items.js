const express = require("express");
const FashionItem = require("../models/FashionItem");
const router = express.Router();
const dbURI = "mongodb://localhost/intelistyle-db";
const mongoose = require("mongoose");
const http = require("http");
const fs = require("fs");
const jlFile =
  "C:/Users/AlinaKraft/Documents/IT/Javascript/AutoLearning/intelistyle/server/data/garment_items.jl";
const defaultImg =
  "https://www.sketchappsources.com/resources/source-image/casual-wear-and-clothing-icons-kosmofish.jpg";

mongoose.connect(dbURI);
mongoose.connection.on("connected", function() {
  console.log("Mongoose default connection open to " + dbURI);

  // To Count Documents of a particular collection
  let coll = mongoose.connection.db.collection("fashionitems");
  coll.countDocuments(function(err, count) {
    //Only fill database if it is currently empty
    if (count == 0) {
      fillDatabase();
      console.log("No Found Records.");
    } else {
      console.log(`Found Records : ${count}`);
    }
  });
});

//Route for search query
router.post("/search", (req, res, next) => {
  const { search, filter } = req.body;
  if (filter === "default") {
    FashionItem.find({
      $text: { $search: search }
    })
      .then(products => {
        res.json(products);
      })
      .catch(e => next(e));
  } else {
    FashionItem.find({
      $text: { $search: search }
    })
      .sort({ price: filter === "ascendingPrice" ? 1 : -1 })
      .then(products => {
        res.json(products);
      })
      .catch(e => next(e));
  }
});

//Method to parse jlFile to JSON-format and save to the database
fillDatabase = () => {
  const content = fs.readFileSync(jlFile, "utf8");

  let contentArr = content.split("\n");
  for (let i = 0; i < contentArr.length; i++) {
    let item = JSON.parse(contentArr[i]);
    let { product_id, brand, url, gender, images, price, product_title } = item;

    //set default image if empty
    let image = (
      images[0] || {
        url: defaultImg
      }
    ).url;

    const newItem = new FashionItem({
      url,
      product_id,
      brand,
      image,
      product_title,
      gender,
      price: Number.parseFloat(price)
    });

    //Using Model.findOneAndUpdate in combination with upsert:true is an alternative to avoid duplicate elements.
    //It is very slow though so for faster performance, the Model.save method was preferred
    newItem.save(function(err, result) {
      if (err) throw err;
      // saved!
    });
  }
};

module.exports = router;
