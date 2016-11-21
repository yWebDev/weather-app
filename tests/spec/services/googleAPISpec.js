/**
 * Created by Юрий on 05.06.2016.
 */
/* globals define */

define(['googleAPI'], function (googleAPI) {
  describe('#googleAPI', function () {
    var placeId = 'ChIJQ2-ONCAkHkERX8veDp0J1dQ';
    var placeData = { lat: 48.3000957, lng: 39.74300059999996 };
    var test = {
      callback: function () {
      }
    };
    var testPredictions = [{
      "country": "Ukraine",
      "locality": "Kharkiv",
      "placeID": "ChIJiw-rY5-gJ0ERCr6kGmgYTC0"
    }, {
      "country": "Ukraine",
      "locality": "Kharkivshchyna",
      "placeID": "ChIJxwVHryxVKEERQmz_6dFHc54"
    }, {
      "country": "Ukraine",
      "locality": "Kharkivtsi",
      "placeID": "ChIJRTi053Qs1kAR5NkdHV1pG2g"
    }, { "country": "Ukraine", "locality": "Kharkivka", "placeID": "ChIJVeT8utf5K0ERTPrrHiRiQMQ" }];

    beforeEach(function () {
      spyOn(test, 'callback');
    });

    it('#googleAPI.getCoords execute callback with coords result by placeId', function () {
      googleAPI.getCoords(placeId, test.callback);
      expect(test.callback).toHaveBeenCalledWith(placeData);
    });

    it('#googleAPI.getCoords with undefined placeId returns null result', function () {
      googleAPI.getCoords(undefined, test.callback);
      expect(test.callback).toHaveBeenCalledWith(null);
    });

    it('#googleAPI.getPredictions get predictions from external google API', function () {
      var args = {
        value: 'Kharkiv',
        success: function () {
        },
        error: function () {
        }
      };
      googleAPI.getPredictions(args, function (resultPredictions) {
        expect(resultPredictions).toEqual(testPredictions);
      });
    });

    it('#googleAPI.getPredictions fail returns empty array', function () {
      var args = {
        success: function () {
        },
        error: function () {
        }
      };
      googleAPI.getPredictions(args, function (resultPredictions) {
        expect(resultPredictions).toEqual([]);
      });
    });

    it('#googleAPI.getPredictions with status "ZERO_RESULTS" returns empty array', function () {
      var args = {
        value: 'Lorem',
        success: function () {
        },
        error: function () {
        }
      };
      googleAPI.getPredictions(args, function (resultPredictions) {
        expect(resultPredictions).toEqual([]);
      });
    });
  });
});
