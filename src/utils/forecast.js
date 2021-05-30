const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/2ee35fbad4840cb883edda300c06130b/" +
    latitude +
    "," +
    longitude;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Poor connection", undefined);
    } else if (response.body.error) {
      callback("cannot find the location", undefined);
    } else {
      callback(
        undefined,
        "It is currently " +
          response.body.currently.temperature +
          " fahrenheit out there" +
          " and " +
          response.body.currently.summary +
          " climate."
      );
    }
  });
};

module.exports = forecast;
