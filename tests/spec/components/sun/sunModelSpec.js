/**
 * Created by Юрий on 15.06.2016.
 */
/* globals define, describe, it */
define(['sunModel'], function (SunModel) {
  describe('#sunModel', function () {
    var model;
    beforeEach(function () {
      model = new SunModel();
    });

    afterEach(function () {
      model = undefined;
    });

    it('#sunModel setPhase should set sun phase', function () {
      expect(model.setPhase(1466014098, 1465992456, 1466050877)).toEqual(0.3704489823864706);
    });

    it('#sunModel calcPosition should calc sun position', function () {
      model.sunRadius = 160;
      model.chordWidth = 1117;
      model.chordHeight = 489.5;
      expect(model.calcPosition(0.3704489823864706)).toEqual({ x: 315.0992369096864, y: 544.7941540842207 });
    });

    it('#sunModel calcPosition with undefined phase should return current phase', function () {
      model.sunRadius = 160;
      model.chordWidth = 1117;
      model.chordHeight = 489.5;
      model.currentPhase = 0.3704489823864706;
      expect(model.calcPosition()).toEqual({ x: 315.0992369096864, y: 544.7941540842207 });
    });
  });
});
