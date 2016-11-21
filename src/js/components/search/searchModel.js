/**
 * Created by Юрий on 29.05.2016.
 */
/* globals define*/
define([
  'customMVC',
  'underscore'
], function (customMVC, _) {
  var searchModel;
  searchModel = customMVC.Model.create({
    data: {
      selectedLocations: {}
    },

    add: function (placeId, placeData) {
      try {
        placeData = JSON.parse(placeData);
        this.data.selectedLocations[placeId] = placeData;
      } catch (e) {
        throw new Error('Error with parsing placeData');
      }
    },

    remove: function (placeId) {
      delete this.data.selectedLocations[placeId];
    },

    reset: function () {
      this.data.selectedLocations = {};
      this.trigger('reset');
    },

    size: function () {
      return _.size(this.data.selectedLocations);
    }


  });
  return searchModel;
});
