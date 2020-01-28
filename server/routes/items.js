const express = require("express");
const FashionItem = require("../models/FashionItem");
const router = express.Router();

//Route for search query
router.post("/search", async (req, res, next) => {
  const { search, filter, offset, limit } = req.body;
  const textQuery = { $text: { $search: search } };
  const sortQuery = filter === "Default" ? null : filter === "Low To High" ? { sort: { price: 1 } } : { sort: { price: -1 } }
  try {
    const allMatches = await FashionItem.find({ $text: { $search: search } });
    const matchesCount = allMatches.length;
    const matchesPerPage = await FashionItem.find(textQuery, null, sortQuery).skip(offset).limit(limit);
    res.json([...matchesPerPage, { resultsTotal: matchesCount }]);
  } catch (err) {
    next(err)
  }
})

module.exports = router;
