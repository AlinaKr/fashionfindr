const express = require("express");
const FashionItem = require("../models/FashionItem");
const router = express.Router();
const dbURI = "mongodb://localhost/intelistyle-db";
const mongoose = require("mongoose");
const fs = require("fs");
const jlFile = "./data/garment_items.jl";
const defaultImg = "https://www.sketchappsources.com/resources/source-image/casual-wear-and-clothing-icons-kosmofish.jpg";

mongoose.connect(dbURI);
mongoose.connection.on("connected", function () {
  console.log("Mongoose default connection open to " + dbURI);

  // To Count Documents of a particular collection
  let coll = mongoose.connection.db.collection("fashionitems");

  coll.countDocuments((err, count) => {
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
router.post("/search", async (req, res, next) => {
  const { search, filter, offset, limit } = req.body;
  const textQuery = { $text: { $search: search } };
  const sortQuery = filter === "Default" ? null : filter === "Low To High" ? { sort: { price: 1 } } : { sort: { price: -1 } }
  try {
    const allMatches = await FashionItem.find({ $text: { $search: search } });
    const matchesCount = allMatches.length;
    const matchesPerPage = await FashionItem.find(textQuery, null, sortQuery).skip(offset).limit(limit);
    console.log(typeof matchesPerPage, { matchesPerPage })
    res.json([...matchesPerPage, { resultsTotal: matchesCount }]);
  } catch (err) {
    next(err)
  }
})

//Method to parse jlFile to JSON-format and save to the database
fillDatabase = () => {
  const content = fs.readFileSync(jlFile, "utf8");
  //remove the last character(a blank line!) of the content string to successfully parse JSON
  let contentArr = content.substring(0, content.length - 1).split("\n");
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
    newItem.save((err, result) => {
      if (err) throw err;
      // saved!
    });
  }
};

module.exports = router;
