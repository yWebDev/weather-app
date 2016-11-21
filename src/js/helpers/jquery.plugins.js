/**
 * Created by Yurii_Shpakovych on 6/9/2016.
 */
/* globals define*/
define(['jquery'], function ($) {
  // Temperature Switcher, Element should have attr "data-temperature-value"
  $.fn.switchTemperature = function (type) {
    var methods = {

      celsius: function () {
        $(this).text(Math.round(($(this).attr('data-temperature-value') - 32) * 5 / 9) + '°');
      },

      fahrenheit: function () {
        $(this).text($(this).attr('data-temperature-value') + '°');
      }

    };

    this.each(function () {
      if (typeof methods[type] === 'function') {
        methods[type].apply(this, Array.prototype.slice(arguments, 1));
      } else {
        methods.fahrenheit.apply(this, Array.prototype.slice(arguments, 1));
      }
    });

    return this;
  };

  $.fn.addScrollbars = function () {
    this.each(function () {
      if (!$(this).hasClass('scrollbar-inner')) {
        $(this).addClass('scrollbar-inner').scrollbar();
      }
    });

    return this;
  };

  $.fn.removeScrollbars = function () {
    this.each(function () {
      $(this).removeClass('scrollbar-inner').scrollbar('destroy');
    });

    return this;
  };
});
