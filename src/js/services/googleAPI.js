/**
 * Created by Юрий on 05.06.2016.
 */
/* globals define, google */
define([
  'underscore',
  'maps'
], function (_) {
  var googleAPI;
  googleAPI = (function autocompleteService() {
    var autocomplete = new google.maps.places.AutocompleteService();
    var geocoder = new google.maps.Geocoder();

    function _getCoords(placeId, callback) {
      geocoder.geocode({ placeId: placeId }, function (geoData) {
        if (!geoData || geoData.length === 0) {
          geoData = null;
        } else {
          geoData = {
            lat: geoData[0].geometry.location.lat(),
            lng: geoData[0].geometry.location.lng()
          };
        }
        callback(geoData);
      });
    }

    function _getSearchPredictionsArray(args) {
      try {
        autocomplete.getPlacePredictions({ input: args.value, types: ['(cities)'] }, function (predictions, status) {
          return args.success(_handleSearchPredictions(predictions, status));
        });
      } catch (e) {
        args.error();
      }
    }

    function _getPredictions(args) {
      return _getSearchPredictionsArray(args);
    }

    function _handleSearchPredictions(predictions, status) {
      try {
        if (status !== 'OK' && status !== 'ZERO_RESULTS') {
          throw new Error('Autocomplete Getting Search Results Error');
        }
        if (status === 'ZERO_RESULTS') {
          predictions = [];
        }
      } catch (e) {
        predictions = [];
      }
      return _filterLocalities(predictions);
    }

    function _filterLocalities(predictionsArray) {
      predictionsArray = predictionsArray.filter(function (prediction) {
        return (prediction.types.indexOf('locality') !== -1);
      });

      predictionsArray = _.map(predictionsArray, function (prediction) {
        var termsLength = prediction.terms.length;
        return {
          country: prediction.terms[termsLength - 1].value,
          locality: prediction.terms[0].value,
          placeID: prediction.place_id
        };
      });
      return predictionsArray;
    }

    function _getCurrentPlaceData(callback) {
      try {
        if (!navigator.geolocation) {
          throw new Error('navigator.geolocation is undefined');
        }

        navigator.geolocation.getCurrentPosition(function (position) {
          var latLng = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          var placeData = null;

          geocoder.geocode({ location: latLng }, function (results, status) {
            if (status !== google.maps.GeocoderStatus.OK) {
              throw new Error('Geocoder failed due to: ' + status);
            }

            if (!results[1]) {
              throw new Error('No results found');
            }

            Array.prototype.forEach.call(results, function (place) {
              var addressComponentsLength;
              if (place.types[0] === 'locality') {
                addressComponentsLength = place.address_components.length;
                placeData = {
                  country: place.address_components[addressComponentsLength - 1].long_name,
                  locality: place.address_components[0].long_name,
                  placeID: place.place_id
                };
              }
            });

            callback({ coords: latLng, placeData: placeData });
          });
        });
      } catch (e) {
        callback(null);
      }
    }


    return {
      getPredictions: _getPredictions,
      getCoords: _getCoords,
      getCurrentPlaceData: _getCurrentPlaceData
    };
  })();

  return googleAPI;
});
