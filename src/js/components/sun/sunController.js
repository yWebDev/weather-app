/**
 * Created by Юрий on 24.04.2016.
 */
/* globals define */
define(['sunView', 'sunModel'], function (SunView, SunModel) {
  function SunController(currentTime, sunriseTime, sunsetTime) {
    this.view = new SunView(new SunModel(currentTime, sunriseTime, sunsetTime));
    this.move();
  }

  SunController.prototype.move = function () {
    this.view.move();
  };

  SunController.prototype.hide = function () {
    this.view.hide();
  };

  SunController.prototype.update = function (parameters) {
    this.view.model.setPhase(parameters.currentTime, parameters.sunriseTime, parameters.sunsetTime);
    this.view.show();
    this.view.move();
  };

  SunController.prototype.updateByPhase = function (phase) {
    this.view.model.currentPhase = phase;
    this.view.move();
  };

  return SunController;
});
