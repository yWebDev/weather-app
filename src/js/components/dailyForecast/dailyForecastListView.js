/**
 * Created by Юрий on 12.05.2016.
 */
/* globals define */
define(['jquery' ,'customMVC'], function (jQuery, customMVC) {
  var dailyForecastListView;

  dailyForecastListView = customMVC.View.create({
    els: [],

    showDays: function (count) {
      var i;
      var dailyForecastItems;
      jQuery.each(this.els, function (key, dailyForecast) {
        dailyForecastItems = jQuery(dailyForecast).find('.daily-forecast-data');
        for (i = 0; i < count; i++) {
          jQuery(dailyForecastItems[i]).removeClass('hidden');
          if (i < count - 1) {
            jQuery(dailyForecastItems[i]).addClass('daily-forecast-data--with-border');
          }
        }
      });
    },

    hideAll: function () {
      var i;
      var count;
      var dailyForecastItems;
      jQuery.each(this.els, function (key, dailyForecast) {
        dailyForecastItems = jQuery(dailyForecast).find('.daily-forecast-data');
        count = dailyForecastItems.length;
        for (i = 0; i < count; i++) {
          jQuery(dailyForecastItems[i]).addClass('hidden');
          jQuery(dailyForecastItems[i]).removeClass('daily-forecast-data--with-border');
        }
      });
    },

    render: function (count) {
      this.els = jQuery('.daily-forecast');
      this.hideAll();
      this.showDays(count);
    },

    initialize: function () {
    }

  });

  return dailyForecastListView;
});
