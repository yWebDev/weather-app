/**
 * Created by Юрий on 15.06.2016.
 */
/* globals define, describe, it */
define(['searchModel'], function (searchModel) {
  describe('#searchModel', function () {
    var placeId = "ChIJdd4hrwug2EcRmSrV3Vo6llI";
    var placeData = "{ \"placeID\" : \"ChIJdd4hrwug2EcRmSrV3Vo6llI\", \"locality\" : \"London\", \"country\" : \"United Kingdom\" }";

    beforeEach(function () {
      searchModel.add(placeId, placeData);
    });

    afterEach(function () {
      searchModel.reset();
    });

    it('#searchModel.add should add location', function () {
      expect(searchModel.data.selectedLocations[placeId]).toEqual(JSON.parse(placeData));
    });

    it('#searchModel.add throw error by fail parsing', function () {
      expect(function () {
        searchModel.add(placeId, 'simple string');
      }).toThrowError('Error with parsing placeData');
    });

    it('#searchModel.remove should remove location', function () {
      searchModel.remove(placeId);
      expect(typeof searchModel.data.selectedLocations[placeId]).toEqual('undefined');
    });

    it('#searchModel.reset should reset locations"', function () {
      spyOn(searchModel, 'trigger');
      searchModel.reset();
      expect(searchModel.data.selectedLocations).toEqual({});
    });

    it('#searchModel.reset should trigger event "reset"', function () {
      spyOn(searchModel, 'trigger');
      searchModel.reset();
      expect(searchModel.trigger).toHaveBeenCalledWith('reset');
    });

    it('#searchModel.size should return size of selectedLocations object', function () {
      expect(searchModel.size()).toEqual(1);
    });
  });
});
