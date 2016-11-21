/**
 * Created by Юрий on 08.05.2016.
 */
/* globals define */
define([
  'customMVC',
  'underscore',
  'text!../templates/city-gallery-item-view.html'
], function (customMVC, _, template) {
  var cityGalleryItemView;

  cityGalleryItemView = customMVC.View.create({
    template: _.template(template),

    initialize: function () {
    },

    get: function () {
      return this.template(this.model.toJSON());
    }

  });

  return cityGalleryItemView;
});
