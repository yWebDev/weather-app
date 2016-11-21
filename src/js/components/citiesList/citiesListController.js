/**
 * Created by Юрий on 12.05.2016.
 */
/* globals define */
define([
  'customMVC',
  'citiesCollection',
  'citiesListView',
  'searchController',
  'settingsController'
], function (customMVC, citiesCollection, citiesListView, searchController, settingsController) {
  var citiesListController;

  citiesListController = customMVC.Controller.create({
    collection: citiesCollection,
    view: citiesListView,

    registerEvents: function () {
      this.listenTo(this.collection, 'update', function () {
        this.view.render(this.collection.getModels());
      });

      this.listenTo(searchController.view, 'show', function () {
        this.view.hide();
      });

      this.listenTo(searchController.view, 'hide', function () {
        this.view.show();
      });

      this.listenTo(this.view, 'removeCities', function (citiesIDs) {
        this.collection.removeModels(citiesIDs);
        this.view.hideRemoving();
      });

      this.listenTo(settingsController.view, 'switchTemperature', function (type) {
        this.view.switchTemperature(type);
      });

      this.listenTo(this.view, 'render', function () {
        this.view.switchTemperature(settingsController.model.getTemperatureType());
      });
    },

    initialize: function () {
      this.registerEvents();
      this.view.render(this.collection.getModels());
    }

  });
  return citiesListController;
});
