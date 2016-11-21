/* globals define */
define([], function () {
  var placeData = [{
    address_components: [{
      long_name: "Krasnodon",
      short_name: "Krasnodon",
      types: ["locality", "political"]
    }, {
      long_name: "Krasnodons'ka city council",
      short_name: "Krasnodons'ka city council",
      types: ["administrative_area_level_3", "political"]
    }, {
      long_name: "Luhans'ka oblast",
      short_name: "Luhans'ka oblast",
      types: ["administrative_area_level_1", "political"]
    }, { long_name: "Ukraine", short_name: "UA", types: ["country", "political"] }],
    formatted_address: "Krasnodon, Luhans'ka oblast, Ukraine",
    geometry: {
      bounds: {
        south: 48.267105,
        west: 39.69281019999994,
        north: 48.331399,
        east: 39.80682609999997
      },
      location: {
        "lat": function () {
          return 48.3000957;
        },
        "lng": function () {
          return 39.74300059999996;
        }
      },
      location_type: "APPROXIMATE",
      viewport: { "south": 48.267105, "west": 39.69281019999994, "north": 48.331399, "east": 39.80682609999997 }
    },
    place_id: "ChIJQ2-ONCAkHkERX8veDp0J1dQ",
    types: ["locality", "political"]
  }];
  var predictions = [{
    "description": "Kharkiv, Kharkiv Oblast, Ukraine",
    "id": "fc121d72e13a3dcf140fc83d0807d1a4d5d3f224",
    "matched_substrings": [{ "length": 7, "offset": 0 }],
    "place_id": "ChIJiw-rY5-gJ0ERCr6kGmgYTC0",
    "reference": "CkQ4AAAA57pgU9rcF4liU7MBbhsNqLf_1WTLhySxVtGY0v8kGgumj9ecAYMZQXnG3Hlmf8L0G6p0rtLltbjzWg7xa4ogOhIQhMADPxvOv2xXJw_l-0AhxxoUUwoPSTwA37OiVhjpTnnrDiUNzok",
    "terms": [{ "offset": 0, "value": "Kharkiv" }, { "offset": 9, "value": "Kharkiv Oblast" }, {
      "offset": 25,
      "value": "Ukraine"
    }],
    "types": ["locality", "political", "geocode"]
  }, {
    "description": "Kharkivs'ka city council, Kharkiv Oblast, Ukraine",
    "id": "71cd939d8ae2ccbf1d72bd261c55830dfbf6e4a6",
    "matched_substrings": [{ "length": 7, "offset": 0 }],
    "place_id": "ChIJJW2OdJ-gJ0ER0sbjZlagetc",
    "reference": "ClRJAAAA7viJbI1s4imOdqZBrOMfs096cb9q3omDWwd2D0O9D8JcNpiQtcq2aGut6qF_TnzlqP0-k0aAxkPcrQN4CWkNPikPX-GTrVKtbhuCFaxaytASEGg81a0L-qTUys3AhNtHdvcaFDiemUWmzkO0bOub3EzTwlJ4-s46",
    "terms": [{ "offset": 0, "value": "Kharkivs'ka city council" }, {
      "offset": 26,
      "value": "Kharkiv Oblast"
    }, { "offset": 42, "value": "Ukraine" }],
    "types": ["administrative_area_level_3", "political", "geocode"]
  }, {
    "description": "Kharkivshchyna, Sums'ka oblast, Ukraine",
    "id": "6c650a6e83d85f040d277a8aae5cad9503e9c68b",
    "matched_substrings": [{ "length": 7, "offset": 0 }],
    "place_id": "ChIJxwVHryxVKEERQmz_6dFHc54",
    "reference": "CkQ_AAAAmq5HkcxCxleYcSSHNayqJqejKIZAkPbjp8z2nECNirgguu-LcAvpmXH0p3MWVxgXaLxrEaQKYgfuB8Sc8WC07BIQ8aOO0W0Z6YPUTTJtzWxURxoUCgZzWrzDldCQPfWzgoxSKi710OU",
    "terms": [{ "offset": 0, "value": "Kharkivshchyna" }, { "offset": 16, "value": "Sums'ka oblast" }, {
      "offset": 32,
      "value": "Ukraine"
    }],
    "types": ["locality", "political", "geocode"]
  }, {
    "description": "Kharkivtsi, Poltavs'ka oblast, Ukraine",
    "id": "dc489f6acb66ceb47ad0d6849c02d982e1500d71",
    "matched_substrings": [{ "length": 7, "offset": 0 }],
    "place_id": "ChIJRTi053Qs1kAR5NkdHV1pG2g",
    "reference": "CkQ-AAAAI6eDEtyQJJmVS4eK5IGE7v5a1xumvvWiNSHiE-DNqS8KDimkrDtSpCDj_ytlHlCxxsR7U8X73_dBuWWDf38-zxIQ48x-m5G6T2FhOqRBQKlslhoUJnlV4gODbMnUPjxVrfdeyyiHyyo",
    "terms": [{ "offset": 0, "value": "Kharkivtsi" }, { "offset": 12, "value": "Poltavs'ka oblast" }, {
      "offset": 31,
      "value": "Ukraine"
    }],
    "types": ["locality", "political", "geocode"]
  }, {
    "description": "Kharkivka, Sums'ka oblast, Ukraine",
    "id": "3f118af505d015f6efe9074e28e4ef82707621d3",
    "matched_substrings": [{ "length": 7, "offset": 0 }],
    "place_id": "ChIJVeT8utf5K0ERTPrrHiRiQMQ",
    "reference": "CkQ6AAAAx7i4ZHRxhN2kllkm4kvNO-Vau4lA26hAiO87dhZELTDzbkPu5qR2RzOwF2Wx7unoYJgvvFjymkoK9kC5hkKgYhIQCKyEcf6hjhhI6o9KDoIBhhoULiBRrgVgfpSRaA6bDLiGEPBeq74",
    "terms": [{ "offset": 0, "value": "Kharkivka" }, { "offset": 11, "value": "Sums'ka oblast" }, {
      "offset": 27,
      "value": "Ukraine"
    }],
    "types": ["locality", "political", "geocode"]
  }];

  var google = {
    maps: {
      Geocoder: function () {
        this.geocode = function (placeId, callback) {
          if (!placeId.placeId) {
            callback(undefined);
          } else {
            callback(placeData);
          }
        };
      },
      places: {
        AutocompleteService: function () {
          this.getPlacePredictions = function (args, callback) {
            if (!args || !args.input) {
              return callback(predictions, null);
            } else if (args.input === 'Lorem') {
              return callback(predictions, 'ZERO_RESULTS');
            } else {
              return callback(predictions, "OK");
            }
          };
        }
      }
    }
  };

  window.google = google;
});
