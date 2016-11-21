/**
 * Created by Yurii_Shpakovych on 4/20/2016.
 */
/* globals define */
define([
  'customMVC',
  'settingsModel',
  'settingsView',
  'citiesCollection'
], function (customMVC, settingsModel, settingsView, citiesCollection) {
  var settingsController = customMVC.Controller.create({
    model: settingsModel,
    view: settingsView,

    initialize: function () {
      this.listenTo(this.model, 'fetch', function (forecastSettings) {
        this.model.setUpSlidersValue(forecastSettings);
        this.model.startUpdateCounter();
        this.view.render(this.model.data);
      });

      this.listenTo(this.view, 'switchTemperature', function (type) {
        this.view.switchTemperature(type);
        this.model.setForecastSettings('temperature', { type: type });
      });

      this.listenTo(this.model, 'update', function () {
        this.model.save();
      });

      this.listenTo(this.model, 'forecastRefresh', function () {
        citiesCollection.refresh();
      });

      this.model.fetch();
    }

  });

  return settingsController;
});
