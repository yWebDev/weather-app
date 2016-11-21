/**
 * Created by Юрий on 12.05.2016.
 */
/* globals define */
define([
  'jquery',
  'customMVC',
  'underscore',
  'swiper',
  'cityGalleryItemView',
  'jqueryscrollbar'
], function (jQuery, customMVC, _, Swiper, cityGalleryItemView) {
  var citiesGalleryListView;

  citiesGalleryListView = customMVC.View.create({
    swiper: undefined,
    id: '#cities-gallery-list',
    refreshButton: '.refresh-forecast',
    temperatureElementsClassName: '.temperature',
    args: {
      pagination: '.swiper-pagination',
      paginationClickable: true,
      onSlideChangeStart: function (swiper) {
        citiesGalleryListView.trigger('changeSlide', swiper.activeIndex);
      }
    },

    swiperInitialize: function () {
      this.swiper = new Swiper(this.id, this.args);
    },

    render: function (models, activeIndex) {
      var slides = [];
      if (_.size(models) === 0 && !this.swiper) {
        return;
      }

      _.each(models, function (model) {
        var itemView = _.extendOwn({ model: model }, cityGalleryItemView);
        slides.push(itemView.get());
      });

      if (!this.swiper || this.swiper === null) {
        this.swiperInitialize();
      }

      this.swiper.removeAllSlides();
      this.swiper.appendSlide(slides);

      if (this.swiper.slides.length === 0) {
        this.swiper.destroy(false, false);
        jQuery('.swiper-pagination').hide();
        this.trigger('destroy');
      } else {
        this.swiper.attachEvents();
        jQuery('.swiper-pagination').show();
      }

      if (activeIndex) {
        this.swiper.slideTo(activeIndex, 0);
      }

      this.addScrollbars();
      this.fixPropagenationScrolledBlocksInGallery();
      this.initRefreshButton();
      this.trigger('render');
    },

    fixPropagenationScrolledBlocksInGallery: function () {
      jQuery('.weather-today').on('touchmove', function (e) {
        e.stopPropagation();
      });
    },

    initRefreshButton: function () {
      var self = this;
      jQuery(this.refreshButton).click(function () {
        self.trigger('refreshForecast');
      });
    },

    initialize: function () {
    },

    addScrollbars: function () {
      jQuery('.weather-today-list').addScrollbars();
    },

    switchTemperature: function (type) {
      jQuery(this.temperatureElementsClassName, this.id).switchTemperature(type);
    },

    activateSlide: function (slideIndex) {
      this.swiper.slideTo(slideIndex);
    }
  });
  return citiesGalleryListView;
});
