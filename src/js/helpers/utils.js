/* globals define */
define([
  'jquery',
  'backbone',
  'underscore'
], function (jQuery) {
  var utils = {};

  function Background() {
    this.seasonBackgrounds = jQuery('.bgs-season div');
    this.weatherdBackground = jQuery('.bg');
  }

  Background.prototype.setWeather = function (className) {
    jQuery(this.weatherdBackground).attr('class', 'bg ' + className);
  };

  Background.prototype.set = function (timeDay, season) {
    var self = this;
    var prevClass = jQuery(this.seasonBackgrounds[0]).attr('data-time-day');
    var prevSeason = jQuery(this.seasonBackgrounds[0]).attr('data-season');
    jQuery(this.seasonBackgrounds[1]).attr('data-time-day', prevClass);
    jQuery(this.seasonBackgrounds[1]).attr('data-season', prevSeason);
    jQuery(this.seasonBackgrounds[1]).removeClass('transparent');

    setTimeout(function () {
      jQuery(self.seasonBackgrounds[1]).addClass('transparent');
      jQuery(self.seasonBackgrounds[0]).attr('data-time-day', timeDay);
      jQuery(self.seasonBackgrounds[0]).attr('data-season', season);
    }, 400);

    return this;
  };

  Background.prototype.setDefault = function () {
    jQuery(this.seasonBackgrounds[0]).attr('data-time-day', 'morning');
    jQuery(this.seasonBackgrounds[0]).attr('data-season', 'cold');

    jQuery(this.seasonBackgrounds[1]).attr('data-time-day', '');
    jQuery(this.seasonBackgrounds[1]).attr('data-season', '');
    jQuery(this.seasonBackgrounds[1]).addClass('transparent');

    jQuery(this.weatherdBackground).attr('class', 'bg');
  };

  Background.prototype.getByPhase = function (parameters) {
    var className;
    var phase = (parameters.currentTime - parameters.sunriseTime) / (parameters.sunsetTime - parameters.sunriseTime);
    if (phase > 1) {
      className = 'night';
    } else if (phase > 0.66) {
      className = 'evening';
    } else if (phase > 0.33) {
      className = 'day';
    } else {
      className = 'morning';
    }
    return className;
  };

  function Sidebar(id, idButton) {
    this.instanse = document.getElementById(id);
    this.handleButton = document.getElementById(idButton);
    this._eventsInit();
  }

  Sidebar.prototype.show = function () {
    var self = this;
    jQuery(self.instanse).addClass('active');
    return self;
  };

  Sidebar.prototype.hide = function () {
    var self = this;
    jQuery(self.instanse).removeClass('active');
    return self;
  };

  Sidebar.prototype.toggle = function () {
    var self = this;
    jQuery(self.instanse).toggleClass('active');
    jQuery('body').toggleClass('overflow-hidden');
    return self;
  };

  Sidebar.prototype._eventsInit = function () {
    var self = this;
    jQuery(self.handleButton).click(function () {
      self.toggle();
    });
  };

  utils.background = new Background(); // init Background
  utils.sidebar = new Sidebar('sidebar', 'icon-menu'); // init Sidebar
  return utils;
});
