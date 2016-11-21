/**
 * Created by Yurii_Shpakovych on 6/10/2016.
 */
/* globals define, describe, it, expect*/
define(['jquery', 'forecastAPI', 'forecast'], function ($, forecastAPI, forecast) {
  var errorResponse = {
    statusText: 'Error'
  };
  var forecastMock;
  var forecastMock2;
  var forecastMock3;
  var forecastMock4;

  var filteredForecastMock;
  var filteredForecastMock2;
  var filteredForecastMock3;
  var filteredForecastMock4;

  forecastMock = forecastMock2 = forecastMock3 = forecastMock4 = forecast.forecastMock;
  forecastMock = JSON.parse(forecastMock);
  forecastMock2 = JSON.parse(forecastMock2);
  forecastMock3 = JSON.parse(forecastMock3);
  forecastMock4 = JSON.parse(forecastMock4);

  forecastMock2['daily']['data'][0]['moonPhase'] = 0.74;
  forecastMock3['daily']['data'][0]['moonPhase'] = 0;
  forecastMock4['daily']['data'][0]['moonPhase'] = 1;

  forecastMock2['currently']['windBearing'] = 20;
  forecastMock3['currently']['windBearing'] = 71;
  forecastMock4['currently']['windBearing'] = 251;

  filteredForecastMock = filteredForecastMock2 = filteredForecastMock3 = filteredForecastMock4 = forecast.filteredForecastMock;

  filteredForecastMock = JSON.parse(filteredForecastMock);
  filteredForecastMock2 = JSON.parse(filteredForecastMock2);
  filteredForecastMock3 = JSON.parse(filteredForecastMock3);
  filteredForecastMock4 = JSON.parse(filteredForecastMock4);

  filteredForecastMock2['current']['moonPhaseIcon'] = 'full-moon';
  filteredForecastMock3['current']['moonPhaseIcon'] = 'empty-moon';
  filteredForecastMock4['current']['moonPhaseIcon'] = 'old-moon';

  filteredForecastMock2['current']['windBearing'] = 20;
  filteredForecastMock3['current']['windBearing'] = 71;
  filteredForecastMock4['current']['windBearing'] = 251;

  filteredForecastMock2['current']['windDirection'] = 'N';
  filteredForecastMock3['current']['windDirection'] = 'E';
  filteredForecastMock4['current']['windDirection'] = 'W';

  describe('#forecastAPI', function () {

    beforeEach(function () {
      spyOn(window.console, 'error');
    });

    it('#forecastAPI.fetch should get data from Forecast IO and parse right', function () {
      spyOn($, 'getJSON').and.callFake(function (url, success) {
        success(forecastMock);
        return {
          error: function (errorResolver) {
            errorResolver(errorResponse);
          }
        };
      });

      forecastAPI.fetch(37.8267, -122.423, function (forecast) {
        expect(forecast).toEqual(filteredForecastMock);
      });
    });

    it('#forecastAPI.fetch should get data from Forecast IO and parse right', function () {
      spyOn($, 'getJSON').and.callFake(function (url, success) {
        success(forecastMock2);
        return {
          error: function (errorResolver) {
            errorResolver(errorResponse);
          }
        };
      });

      forecastAPI.fetch(37.8267, -122.423, function (forecast) {
        expect(forecast).toEqual(filteredForecastMock2);
      });
    });

    it('#forecastAPI.fetch should get data from Forecast IO and parse right', function () {
      spyOn($, 'getJSON').and.callFake(function (url, success) {
        success(forecastMock3);
        return {
          error: function (errorResolver) {
            errorResolver(errorResponse);
          }
        };
      });

      forecastAPI.fetch(37.8267, -122.423, function (forecast) {
        expect(forecast).toEqual(filteredForecastMock3);
      });
    });

    it('#forecastAPI.fetch should get data from Forecast IO and parse right', function () {
      spyOn($, 'getJSON').and.callFake(function (url, success) {
        success(forecastMock4);
        return {
          error: function (errorResolver) {
            errorResolver(errorResponse);
          }
        };
      });

      forecastAPI.fetch(37.8267, -122.423, function (forecast) {
        expect(forecast).toEqual(filteredForecastMock4);
      });
    });
  });
});
