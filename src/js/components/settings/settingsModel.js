/**
 * Created by Yurii_Shpakovych on 4/20/2016.
 */
/* globals define */
define([
  'jquery',
  'customMVC',
  'underscore'
], function (jQuery, customMVC, _) {
  var defaultSettings = {
    dailyForecast: {
      count: 4
    },
    temperature: {
      type: 'fahrenheit'
    },
    updateForecast: {
      interval: 15
    },
    activeSlide: {
      index: 0
    }
  };
  var settingsModel = customMVC.Model.create({
    STORAGEKEY: 'wa-settings',
    data: {
      sliders: {
        '#show-weather-for': {
          range: 'min',
          value: 4,
          min: 1,
          max: 7,
          step: 1,
          slide: function (event, ui) {
            jQuery('#show-weather-for-val').text(ui.value);
            settingsModel.setForecastSettings('dailyForecast', { count: ui.value });
            settingsModel.trigger('dailyForecastChange', ui.value);
          }
        },
        '#update-weather-every': {
          range: 'min',
          value: 15,
          min: 15,
          max: 60,
          step: 15,
          slide: function (event, ui) {
            jQuery('#update-weather-every-val').text(ui.value);
            settingsModel.setForecastSettings('updateForecast', { interval: ui.value });
          }
        }
      },
      forecastSettings: {}
    },

    setForecastSettings: function (key, value) {
      this.data.forecastSettings[key] = value;
      this.trigger('update');
    },

    save: function () {
      localStorage.setItem(this.STORAGEKEY, JSON.stringify(this.data.forecastSettings));
    },

    fetch: function () {
      var forecastSettings = localStorage.getItem(this.STORAGEKEY);
      try {
        forecastSettings = JSON.parse(forecastSettings);
        if (forecastSettings === null) {
          forecastSettings = defaultSettings;
        }
      } catch (e) {
        this.data.forecastSettings = defaultSettings;
        this.save();
        throw new Error('Error with parsing settings from localStorage');
      }
      this.data.forecastSettings = forecastSettings;
      this.trigger('fetch', forecastSettings);
    },

    setUpSlidersValue: function (forecastSettings) {
      this.data.sliders['#show-weather-for'].value = forecastSettings.dailyForecast.count;
      this.data.sliders['#update-weather-every'].value = forecastSettings.updateForecast.interval;
    },

    getTemperatureType: function () {
      return this.data.forecastSettings.temperature.type;
    },

    getDailyForecastCount: function () {
      return this.data.forecastSettings.dailyForecast.count;
    },

    getActiveSlideIndex: function () {
      return this.data.forecastSettings.activeSlide.index;
    },

    getForecastUpdateIntervalInMiliseconds: function () {
      return this.data.forecastSettings.updateForecast.interval * 1000 * 60;
    },

    startUpdateCounter: function () {
      setInterval(_.bind(this.trigger, this, 'forecastRefresh'), this.getForecastUpdateIntervalInMiliseconds());
    }
  });

  return settingsModel;
});
