/**
 * Created by Юрий on 12.05.2016.
 */
/* globals define */
define([
  'jquery',
  'customMVC',
  'underscore',
  'citiesGalleryController',
  'text!../templates/cities-list-item.html',
  'jqueryscrollbar',
  'jqueryPlugins'
], function (jQuery, customMVC, _, citiesGalleryController, template) {
  var citiesListView;

  citiesListView = customMVC.View.create({

    el: jQuery('#cities-list')[0],
    toggleSearchButton: jQuery('#toggle-search')[0],
    removeButton: jQuery('#remove-add')[0],
    removeCityCheckboxLabelsClassName: '.city-remove-label',
    removeCityCheckboxClassName: '.city-remove',
    temperatureElementsClassName: '.temperature',
    template: _.template(template),
    citiesListItemClassName: '.cities-list__item',
    checkboxWrapperClassName: '.checkbox-wrapper',

    registerEvents: function () {
      jQuery(this.removeButton).click(_.bind(this.toggleCheckboxes, this));
      jQuery(this.toggleSearchButton).click(_.bind(this.removeCities, this));
    },

    activateSlide: function (event) {
      var placeID;

      if (jQuery(event.target).attr('type') === 'checkbox') {
        placeID = jQuery(event.target).val();
      } else {
        placeID = jQuery(this.removeCityCheckboxClassName, event.currentTarget).val();
      }

      this.trigger('activateSlide', placeID);
    },

    removeCities: function (event) {
      var checked = [];
      if (!jQuery(this.toggleSearchButton).hasClass('icon-check')) {
        return;
      }
      jQuery.each(this.findCheckedCheckboxes(event), function (i, element) {
        checked.push(element.value);
      });
      event.stopImmediatePropagation();
      this.trigger('removeCities', checked);
    },

    hideRemoving: function () {
      jQuery(this.removeButton).removeClass('active');
      jQuery(this.toggleSearchButton).removeClass('icon-check').addClass('icon-add');
      jQuery(this.removeCityCheckboxLabelsClassName).addClass('hidden');
      this.trigger('hideRemoving');
    },

    toggleCheckboxes: function (event) {
      if (jQuery(this.toggleSearchButton).hasClass('active')) {
        return;
      }

      if (jQuery(event.target).hasClass('active')) {
        jQuery(event.target).removeClass('active');
        jQuery(this.toggleSearchButton).removeClass('icon-check').addClass('icon-add');
        jQuery(this.removeCityCheckboxClassName + ':checked').prop('checked', false);
        jQuery(this.removeCityCheckboxLabelsClassName).addClass('hidden');
      } else {
        jQuery(event.target).addClass('active');
        jQuery(this.removeCityCheckboxLabelsClassName).removeClass('hidden');
      }
    },

    findCheckedCheckboxes: function (event) {
      var checked;

      if (jQuery(event.target).attr('type') !== 'checkbox') {
        event.preventDefault();
        jQuery(this.removeCityCheckboxClassName, event.currentTarget).trigger('click');
      }

      checked = jQuery(this.removeCityCheckboxClassName + ':checked');

      if (checked.length > 0) {
        jQuery(this.toggleSearchButton).removeClass('icon-add').addClass('icon-check');
      } else {
        jQuery(this.toggleSearchButton).removeClass('icon-check').addClass('icon-add');
      }

      return checked;
    },

    customizeScrollbar: function () {
      jQuery(this.el).addScrollbars();
    },

    show: function () {
      jQuery(this.el).removeClass('hidden').addScrollbars();
      this.trigger('show');
    },

    hide: function () {
      jQuery(this.removeButton).removeClass('active');
      jQuery(this.removeCityCheckboxLabelsClassName).addClass('hidden');
      jQuery(this.el).addClass('hidden').removeScrollbars();
      this.trigger('hide');
    },

    render: function (cities) {
      var listHtml = '';
      _.each(cities, function (city) {
        listHtml += this.template(city.toJSON());
      }, this);
      jQuery(this.el).html('');
      jQuery(this.el).html(listHtml);
      this.customizeScrollbar();
      jQuery(this.citiesListItemClassName).click(_.bind(this.citiesItemHandler, this));
      this.trigger('render');
    },

    citiesItemHandler: function () {
      if (jQuery(this.removeButton).hasClass('active')) {
        this.findCheckedCheckboxes.apply(this, arguments);
      } else {
        this.activateSlide.apply(this, arguments);
      }
    },


    initialize: function () {
      this.registerEvents();
    },

    switchTemperature: function (type) {
      jQuery(this.temperatureElementsClassName, this.el).switchTemperature(type);
    }

  });

  return citiesListView;
});
