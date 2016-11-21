/**
 * Created by Юрий on 12.05.2016.
 */
/* globals define */
define([
  'customMVC',
  'underscore',
  'sun',
  'utils',
  'citiesGalleryListView',
  'citiesCollection',
  'settingsController',
  'citiesListController'
], function (customMVC, _, sun, utils, citiesGalleryListView, citiesCollection, settingsController, citiesListController) {
  var citiesGalleryController;

  citiesGalleryController = customMVC.Controller.create({
    collection: citiesCollection,
    view: citiesGalleryListView,

    initialize: function () {
      // events
      this.listenTo(this.collection, 'update', function () {
        var activeIndex = settingsController.model.getActiveSlideIndex();
        var model = this.collection.getByIndex(activeIndex);

        this.view.render(this.collection.getModels(), activeIndex);

        if (model) {
          this.setWeatherAnimation(model.toJSON());
        }
      });

      this.listenTo(this.view, 'refreshForecast', function () {
        this.collection.refresh();
      });

      this.listenTo(this.view, 'render', function () {
        this.view.switchTemperature(settingsController.model.getTemperatureType());
        settingsController.model.setForecastSettings('activeSlide', { index: this.view.swiper.activeIndex });
      });

      this.listenTo(this.view, 'destroy', function () {
        sun.hide();
        utils.background.setDefault();
        settingsController.model.setForecastSettings('activeSlide', { index: 0 });
      });

      this.listenTo(this.view, 'changeSlide', function (activeIndex) {
        this.setWeatherAnimation(this.collection.getByIndex(activeIndex).toJSON());
        settingsController.model.setForecastSettings('activeSlide', { index: activeIndex });
      });

      this.listenTo(settingsController.view, 'switchTemperature', function (type) {
        this.view.switchTemperature(type);
      });

      this.listenTo(citiesListController.view, 'activateSlide', function (placeID) {
        var slideIndex = this.collection.getIndexOf(placeID);
        this.view.activateSlide(slideIndex);
      });

      this.collection.fetch();
    },

    setWeatherAnimation: function (modelData) {
      var params = {
        currentTime: modelData.forecast.current.timestamp,
        sunriseTime: modelData.forecast.current.sunriseTimestamp,
        sunsetTime: modelData.forecast.current.sunsetTimestamp
      };
      var backgroundClassName = utils.background.getByPhase(params);
      sun.update(params);
      utils.background.setWeather(modelData.forecast.current.icon);
      if (modelData.forecast.current.middleTemperatureInCelcius > 20) {
        utils.background.set(backgroundClassName, 'hot');
      } else {
        utils.background.set(backgroundClassName, 'cold');
      }
    }

  });
  return citiesGalleryController;
});
