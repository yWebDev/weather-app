/**
 * Created by Юрий on 24.04.2016.
 */
/* globals define */
define(['jquery'], function (jQuery) {
  function SunModel(currentTime, sunriseTime, sunsetTime) { // time in hours
    this.sunElement = document.getElementById('sun');
    this.currentTime = currentTime;
    this.sunriseTime = sunriseTime;
    this.sunsetTime = sunsetTime;
    this.chordWidth = window.innerWidth;
    this.chordHeight = window.innerHeight / 2;
    this.sunRadius = jQuery(this.sunElement).width() / 2;
    this.setPhase(currentTime, sunriseTime, sunsetTime);
  }

  SunModel.prototype.setPhase = function (currentTime, sunriseTime, sunsetTime) {
    this.currentPhase = (currentTime - sunriseTime) / (sunsetTime - sunriseTime);
    return this.currentPhase;
  };

  SunModel.prototype.calcPosition = function (phase) {
    var circleRadius;
    var sectorAngle;
    var additionalAngle;
    var fullSectorAngle;
    var cartesianFullSectorAngle;
    var positionX;
    var positionY;
    if (typeof phase === 'undefined') {
      phase = this.currentPhase;
    }
    circleRadius = this.chordHeight / 2 + (this.chordWidth * this.chordWidth) / (8 * this.chordHeight);
    sectorAngle = 2 * Math.acos((circleRadius - this.chordHeight) / circleRadius);
    additionalAngle = 2 * Math.asin(this.sunRadius / (2 * circleRadius));
    fullSectorAngle = sectorAngle + 2 * additionalAngle;
    cartesianFullSectorAngle = Math.PI / 2 - fullSectorAngle / 2;
    positionX = this.chordWidth / 2 - circleRadius * Math.cos(cartesianFullSectorAngle +
        fullSectorAngle * phase);
    positionY = this.chordHeight * 2 + (circleRadius - this.chordHeight) -
      circleRadius * Math.sin(cartesianFullSectorAngle + fullSectorAngle * phase);
    this.sunCurrentPosition = { x: positionX, y: positionY };
    return this.sunCurrentPosition;
  };

  return SunModel;
});
