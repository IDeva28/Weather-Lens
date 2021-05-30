const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const request = require("request");

const app = express();

//Define paths for express config
const publicDirpath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

//set up handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

//set up static directory to serve
app.use(express.static(publicDirpath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Devarshee",
    creation: "deva"
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Ramu",
    creation: "deva"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Us",
    name: "Anuja",
    creation: "deva"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "you must provide an address"
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        res.send({ error });
      }

      forecast(latitude, longitude, (error, fore_data) => {
        if (error) {
          res.send({ error });
        }

        res.send({
          forcast: fore_data,
          location,
          address: req.query.address
        });
      });
    }
  );
});

app.get("*", (req, res) => {
  res.render("404page", {
    title: "error 404",
    errorMessage: "Page not found"
  });
});

app.get("/help/*", (req, res) => {
  res.render("404page", {
    title: "Error",
    errorMessage: "Help article not found"
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide Search term"
    });
  }
  console.log(req.query);
  res.send({ product: [] });
});

app.get("*", (req, res) => {
  res.render("404page");
});

app.listen(3000, () => {
  console.log("server is running");
});
