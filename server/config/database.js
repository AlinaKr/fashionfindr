const FashionItem = require("../models/FashionItem");
const mongoose = require("mongoose");
const fs = require("fs");
const config = require('config')
const dbURI = config.get('mongoURI')
const jlFile = "./data/garment_items.jl";
const defaultImg = "https://www.sketchappsources.com/resources/source-image/casual-wear-and-clothing-icons-kosmofish.jpg";

// Don't forget to set "MONGODB_URI" in ~/server/.env
const uri = process.env.MONGODB_URI || dbURI;

const connectDB = async () => {
  try {
    const x = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);

    let coll = mongoose.connection.db.collection("fashionitems");

    let count = await coll.countDocuments()
    if (count == 0) {
      await fillDatabase();
      console.log("Database was filled.");
    } else {
      console.log(`Found Records : ${count}`);
    }
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

//Method to parse jlFile to JSON-format and save to the database
const fillDatabase = async () => {
  try {
    const content = fs.readFileSync(jlFile, "utf8");
    const fashionItems = []

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

      fashionItems.push(newItem)
    }
    //Using Model.findOneAndUpdate in combination with upsert:true is an alternative to avoid duplicate elements.
    //It is very slow though so for faster performance, the Model.save method was preferred
    await FashionItem.insertMany(fashionItems)
  } catch (err) {
    console.error(err.message)
  }
};

module.exports = connectDB


