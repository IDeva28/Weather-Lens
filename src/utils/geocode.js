const request = require("request");

const geocode = (adderss, callback) => {
  const geocoding =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    adderss +
    ".json?access_token=pk.eyJ1IjoiZGV2YXJzaGVlIiwiYSI6ImNrODJ1cDZudDBseWIzbm93NzZubTF1NDgifQ.taHw4w1CsBjznvQ5PpGRGQ";

  request({ url: geocoding, json: true }, (error, response) => {
    if (error) {
      callback("Poor connection", undefined);
    } else if (response.body.features.length === 0) {
      callback("unable to find location", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
