/**
 * Created by Юрий on 24.04.2016.
 */
/* globals define */
define(['jquery'], function (jQuery) {
  function SunView(model) {
    this.model = model;
  }

  SunView.prototype.hide = function () {
    jQuery(this.model.sunElement).hide();
  };

  SunView.prototype.show = function () {
    jQuery(this.model.sunElement).show();
  };

  SunView.prototype.move = function () {
    var self = this;
    jQuery(self.model.sunElement).stop();
    jQuery(self.model.sunElement).animate({
      phase: self.model.currentPhase
    }, {
      duration: 2000,
      easing: 'swing',
      step: function (phase) {
        var phaseForBackground;
        var x = self.model.calcPosition(phase).x;
        var y = self.model.calcPosition(phase).y;
        if (phase > 2) { // if on next listing yet next Day
          phaseForBackground = phase.toString().replace(/.+(?=\.)/, ''); // replace int numbers, leave only after dot
        } else {
          phaseForBackground = phase;
        }
        jQuery(self.model.sunElement).css({ left: x, top: y });
        jQuery(self.model.sunElement).find('div').css({
          background: 'radial-gradient(rgba(255, 240, 0, 1), rgba(255,' +
          parseInt(240 - 156 * phaseForBackground, 10) + ', 0, ' + (0.5 + 0.5 * phaseForBackground)
          + '),  rgba(255, 84, 0, 0) 66%)'
        }); // change Sun gradient
      }
    });
  };
  return SunView;
});
