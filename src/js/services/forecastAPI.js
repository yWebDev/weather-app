/**
 * Created by Юрий on 05.06.2016.
 */
/*eslint no-console: ["error", { allow: ["error"] }] */
/* globals */
define([
  'jquery',
  'underscore'
], function (jQuery, _) {
  var forecastAPI;
  forecastAPI = (function () {
    var API_KEY = '43ae90ee6a148b20d4c909ff6b7d908f';
    var API_ADDRESS = 'https://api.forecast.io/forecast/';
    var API_CALLBACK = '?callback=?';

    function _fetch(lat, lng, callback) {
      var url = API_ADDRESS + API_KEY + '/' + lat + ',' + lng + API_CALLBACK;

      jQuery.getJSON(url, function (response) {
        callback(_filterData(response));
      }).error(function (response) {
        console.error('Error with receiving data from forecastAPI: ' + response.statusText);
      });
    }

    function _filterData(forecastData) {
      var localityDate = _getDate(forecastData['currently']['time'], forecastData['offset']);
      var sunriseDate = _getDate(forecastData['daily']['data'][0]['sunriseTime'], forecastData['offset']);
      var sunsetTime = _getDate(forecastData['daily']['data'][0]['sunsetTime'], forecastData['offset']);
      var resultForecastData;
      resultForecastData = {
        current: {
          dateNumber: _getDateNumber(localityDate),
          monthName: _getMonth(localityDate),
          dayName: _getDay(localityDate, true),
          summary: forecastData['currently']['summary'],
          time: _getTime(localityDate),
          temperature: Math.round(forecastData['currently']['temperature']),
          moonPhaseIcon: _getMoonPhaseIconName(forecastData['daily']['data'][0]['moonPhase']),
          icon: forecastData['currently']['icon'],
          timestamp: forecastData['currently']['time'],
          sunriseTimestamp: forecastData['daily']['data'][0]['sunriseTime'],
          sunsetTimestamp: forecastData['daily']['data'][0]['sunsetTime'],
          sunriseTime: _getTime(sunriseDate),
          sunsetTime: _getTime(sunsetTime),
          windSpeed: Math.round(forecastData['currently']['windSpeed']),
          windBearing: Math.round(forecastData['currently']['windBearing']),
          windDirection: _getWindDirection(forecastData['currently']['windBearing']),
          humidity: Math.round(forecastData['currently']['humidity'] * 100),
          middleTemperatureInCelcius: _getMiddleTemperatureInCelcius(
            forecastData['daily']['data'][0]['temperatureMax'],
            forecastData['daily']['data'][0]['temperatureMin']
          )
        },
        hourly: [],
        daily: []
      };

      // daily
      forecastData['daily']['data'] = forecastData['daily']['data'].splice(0, 7);

      _.each(forecastData['daily']['data'], function (dailyForecast) {
        resultForecastData.daily.push({
          dayName: _getDay(_getDate(dailyForecast['time'], forecastData['offset'])),
          icon: dailyForecast['icon'],
          temperatureMax: Math.round(dailyForecast['temperatureMax']),
          temperatureMin: Math.round(dailyForecast['temperatureMin'])
        });
      });

      // hourly
      forecastData['hourly']['data'] = forecastData['hourly']['data'].splice(1, 24);

      _.each(forecastData['hourly']['data'], function (hourlyForecast) {
        resultForecastData.hourly.push({
          time: _getTime(_getDate(hourlyForecast['time'], forecastData['offset'])),
          icon: hourlyForecast['icon'],
          temperature: Math.round(hourlyForecast['temperature'])
        });
      });
      return resultForecastData;
    }

    function _getDateNumber(localityDate) {
      return localityDate.getDate();
    }

    function _getDate(timestamp, offset) {
      var clientDate = new Date();
      var clientOffset = clientDate.getTimezoneOffset();
      return new Date((timestamp + clientOffset * 60 + offset * 3600) * 1000);
    }

    function _getTime(date) {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      hours = hours.toString().length === 1 ? '0' + hours : hours;
      minutes = minutes.toString().length === 1 ? '0' + minutes : minutes;
      return hours + ':' + minutes;
    }

    function _getMonth(localityDate) {
      var months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ];
      return months[localityDate.getMonth()];
    }

    function _getDay(date, longName) {
      var longNames = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ];
      var shortNames = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat'
      ];
      if (longName) {
        return longNames[date.getDay()];
      } else {
        return shortNames[date.getDay()];
      }
    }

    function _getMoonPhaseIconName(moonPhase) {
      if (moonPhase > 0.75) {
        return 'old-moon';
      } else if (moonPhase > 0.25) {
        return 'full-moon';
      } else if (moonPhase > 0.1) {
        return 'young-moon';
      } else {
        return 'empty-moon';
      }
    }

    function _getWindDirection(windBearing) {
      var direction = '';
      switch (true) {
        case windBearing > 340 || windBearing < 30:
          direction = 'N';
          break;
        case windBearing > 290:
          direction = 'NW';
          break;
        case windBearing > 250:
          direction = 'W';
          break;
        case windBearing > 210:
          direction = 'SW';
          break;
        case windBearing > 160:
          direction = 'S';
          break;
        case windBearing > 130:
          direction = 'SE';
          break;
        case windBearing > 70:
          direction = 'E';
          break;
        case windBearing >= 30:
          direction = 'NE';
          break;
        default:
          direction = 'N';
          break;
      }
      return direction;
    }

    function _getMiddleTemperatureInCelcius(max, min) {
      return Math.round(((max + min) / 2 - 32) * 5 / 9);
    }

    return {
      fetch: _fetch
    };
  })();
  return forecastAPI;
});
