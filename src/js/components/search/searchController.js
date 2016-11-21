/**
 * Created by Юрий on 12.05.2016.
 */
/* globals define, _, jQuery */
define([
  'customMVC',
  'searchView',
  'searchModel',
  'citiesCollection',
  'googleAPI',
  'forecastAPI'
], function (customMVC, searchView, searchModel, citiesCollection, googleAPI, forecastAPI) {
  var searchController;

  searchController = customMVC.Controller.create({
    view: searchView,
    model: searchModel,
    citiesCollection: citiesCollection,

    registerEvents: function () {
      jQuery(this.view.input).on('input', _.bind(this.getPredictions, this));

      this.listenTo(this.model, 'reset', function () {
        this.view.disableAdding();
      });

      this.listenTo(this.view, 'render', function () {
        this.model.reset();
        jQuery(this.view.placeChecksClassName).on('change', _.bind(this.toggleCheckedlocation, this));
        jQuery(this.view.clickableListItemsClassName).on('click', _.bind(this.deligateItemClickTOCheckbox, this));
      });

      this.listenTo(this.view, 'hide', function () {
        this.model.reset();
      });

      this.listenTo(this.view, 'click searchView:addButton', function () {
        this.addNewLocations();
      });

      this.listenTo(this.citiesCollection, 'empty-collection', function () {
        var self = this;
        googleAPI.getCurrentPlaceData(function (response) {
          if (response) {
            self.model.data.selectedLocations[response.placeData.placeID] = response.placeData;
            self.addNewForecast(response.coords, response.placeData);
          }
        });
      });
    },

    getPredictions: function (event) {
      var self = this;
      googleAPI.getPredictions({
        value: event.target.value,

        success: function (predictions) {
          self.view.render(predictions);
        },

        error: function () {
          self.view.render([]);
        }
      });
    },

    toggleCheckedlocation: function (event) {
      if (event.target.checked) {
        this.model.add(event.target.id, event.target.value);
      } else {
        this.model.remove(event.target.id);
      }
      if (this.model.size() === 0) {
        this.view.disableAdding();
      } else {
        this.view.enableAdding();
      }
    },

    deligateItemClickTOCheckbox: function (event) {
      var $label = jQuery(this.view.placeChecksLabelClassName, event.target);
      if ($label !== event.target) {
        $label.trigger('click');
      }
    },

    addNewLocations: function () {
      var self = this;
      if (this.model.size() === 0) {
        return;
      }
      try {
        _.each(this.model.data.selectedLocations, function (placeData, placeID) {
          if (self.citiesCollection.find(placeID)) {
            return;
          }

          googleAPI.getCoords(placeID, function (geoCoderResponse) {
            placeData.lat = geoCoderResponse.lat;
            placeData.lng = geoCoderResponse.lng;
            self.addNewForecast(geoCoderResponse, placeData);
          });
        });
        this.view.hide();
      } catch (e) {
        console.error(e); //eslint-disable-line no-console
      }
    },

    addNewForecast: function (geoCoderResponse, placeData) {
      var self = this;
      forecastAPI.fetch(geoCoderResponse.lat, geoCoderResponse.lng, function (forecastResponse) {
        self.citiesCollection.add(customMVC.Model.create({
          data: {
            placeData: placeData,
            forecast: forecastResponse
          }
        }));
      });
    },

    initialize: function () {
      this.registerEvents();
    }
  });
  return searchController;
});
