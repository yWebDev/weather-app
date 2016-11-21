/**
 * Created by Юрий on 12.05.2016.
 */
/* globals define */
define([
  'customMVC',
  'settingsController',
  'citiesGalleryController',
  'dailyForecastListView'
], function (customMVC, settingsController, citiesGalleryController, dailyForecastListView) {
  var dailyForecastController;

  dailyForecastController = customMVC.Controller.create({

    view: dailyForecastListView,


    initialize: function () {
      this.listenTo(citiesGalleryController.view, 'render', function () {
        this.view.render(settingsController.model.getDailyForecastCount());
      });

      this.listenTo(settingsController.model, 'dailyForecastChange', function (countDays) {
        this.view.render(countDays);
      });

      this.view.render(settingsController.model.getDailyForecastCount());
    }

  });

  return dailyForecastController;
});
