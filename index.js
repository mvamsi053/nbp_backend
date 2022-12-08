const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

mongoose.connect(process.env.URL);

const app = express();
// var distDir = __dirname + "/dist/";
// app.use(express.static(distDir));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname + "/public")));

const recipeSchema = new mongoose.Schema({
  id: Number,
  name: String,
  category: String,
  author: String,
  author_id: String,
  image: String,
  cookingTime: Number,
  servings: Number,
  about: String,
  ingredients: [String],
  process: [String],
});

const Recipe = mongoose.model("Recipe", recipeSchema);

app.get("/recipes", function (req, res) {
  Recipe.find(function (err, foundRecipe) {
    res.send(foundRecipe);
  });
});

app.post("/recipes", function (req, res) {
  const newRecipe = new Recipe({
    id: req.body.id,
    name: req.body.recipeName,
    category: req.body.category,
    author: req.body.authorName,
    author_id: req.body.author_id,
    image: req.body.image,
    cookingTime: req.body.cookingTime,
    servings: req.body.noOfServings,
    about: req.body.about,
    ingredients: req.body.ingredients,
    process: req.body.procedure,
  });
  newRecipe.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.send(newRecipe);
    }
  });

  console.log(newRecipe);
});

app
  .route("/recipes/:id")
  .delete(function (req, res) {
    Recipe.findOneAndDelete(
      {
        _id: req.params.id,
      },
      function (err) {
        if (!err) {
          res.send("Deleted recipe");
        } else {
          res.send(err);
        }
      }
    );
  })
  .put(function (req, res) {
    Recipe.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        id: req.body.id,
        name: req.body.recipeName,
        category: req.body.category,
        author: req.body.authorName,
        author_id: req.body.author_id,
        image: req.body.image,
        cookingTime: req.body.cookingTime,
        servings: req.body.noOfServings,
        about: req.body.about,
        ingredients: req.body.ingredients,
        process: req.body.procedure,
      },
      { overwrite: true },
      function (err) {
        if (!err) {
          res.send("Successfully Updated");
        } else {
          res.send("Eoor in updating");
        }
      }
    );
  });

app.listen(process.env.PORT || 3001, function () {
  console.log("server running on port 3001");
});
module.exports = app;
