/**
 * Created by Юрий on 08.05.2016.
 */
/* globals define*/
define([
  'customMVC',
  'underscore',
  'forecastAPI'
], function (customMVC, _, forecastAPI) {
  var collection;
  var forecast;

  collection = customMVC.Collection.create();

  collection.STORAGEKEY = 'wa-collection';

  collection.setToLocalStorage = function (data) {
    return localStorage.setItem(this.STORAGEKEY, data);
  };

  collection.getFromLocalStorage = function () {
    return localStorage.getItem(this.STORAGEKEY);
  };

  collection.fetch = function () {
    var data;
    try {
      data = JSON.parse(this.getFromLocalStorage());
    } catch (e) {
      throw new Error('Error with parsing forecast data from localStorage');
    }

    if (data !== null) {
      forecast = data.map(function (cityData) {
        return customMVC.Model.create({ data: cityData });
      });

      this.add(forecast);
      this.trigger('fetch');
    }

    if (!data || data.length === 0) {
      this.trigger('empty-collection');
    }
  };

  collection.save = function () {
    var models = [];
    _.each(this.models, function (model) {
      models.push(model.toJSON());
    });
    collection.setToLocalStorage(JSON.stringify(models));
  };

  collection.find = function (placeID) {
    return _.find(this.models, function (model) {
      return model.data.placeData.placeID === placeID;
    });
  };

  collection.removeModels = function (citiesIDs) {
    if (!_.isArray(citiesIDs)) {
      throw new Error('citiesIDs should be array');
    }

    _.each(collection.models, function (model) {
      if (citiesIDs.indexOf(model.data.placeData.placeID) !== -1) {
        delete collection.models[model.uid];
      }
    });
    this.trigger('update');
  };

  collection.getIndexOf = function (placeID) {
    return _.indexOf(_.toArray(this.models), this.find(placeID));
  };

  collection.getByIndex = function (index) {
    return _.toArray(this.models)[index];
  };

  collection.refresh = function () {
    var self = this;
    var size = _.size(this.models);
    _.each(this.models, function (model, id) {
      forecastAPI.fetch(model.data.placeData.lat, model.data.placeData.lng, function (forecastResponse) {
        self.models[id].data.forecast = forecastResponse;

        size--;

        if (!size) {
          self.trigger('update');
        }
      });
    });
  };
  // events
  collection.on('update', collection.save);
  return collection;
});
