/**
 * Created by Yurii_Shpakovych on 4/20/2016.
 */
/* globals define */
define([
  'jquery',
  'underscore',
  'customMVC',
  'jqueryui'
], function (jQuery, _, customMVC) {
  var settingsView;

  settingsView = customMVC.View.create({
    temperatureSwitchersToCelsius: '#temperature-to-celsius',
    temperatureSwitchersToFahrenheit: '#temperature-to-fahrenheit',

    registerEvents: function () {
      jQuery(this.temperatureSwitchersToCelsius).click(_.bind(this.trigger, this, 'switchTemperature', 'celsius'));
      jQuery(this.temperatureSwitchersToFahrenheit).click(_.bind(this.trigger, this, 'switchTemperature', 'fahrenheit'));
    },

    render: function (settings) {
      _.each(settings.sliders, function (sliderArgs, id) {
        jQuery(id).slider(sliderArgs);
        jQuery(id + '-val').text(sliderArgs.value);
      });
      this.switchTemperature(settings.forecastSettings.temperature.type);
    },

    switchTemperature: function (type) {
      if (type === 'celsius') {
        jQuery(this.temperatureSwitchersToFahrenheit).removeClass('active');
        jQuery(this.temperatureSwitchersToCelsius).addClass('active');
      } else {
        jQuery(this.temperatureSwitchersToCelsius).removeClass('active');
        jQuery(this.temperatureSwitchersToFahrenheit).addClass('active');
      }
    },

    initialize: function () {
      this.registerEvents();
    }

  });

  return settingsView;
});
