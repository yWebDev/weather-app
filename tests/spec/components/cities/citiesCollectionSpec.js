/**
 * Created by Yurii_Shpakovych on 6/9/2016.
 */
/* globals define, describe, it, expect*/
define(['citiesCollection', 'customMVC', 'forecastAPI', 'collection'], function (citiesCollection, customMVC, forecastAPI, collectionMock) {

  describe('#citiesCollection', function () {
    var collection;

    beforeEach(function () {
      collection = citiesCollection;
    });

    afterEach(function () {
      collection = undefined;
    });

    it('#citiesCollection type', function () {
      expect(typeof collection).toEqual('object');
    });

    it('#citiesCollection.fetch should throw an error', function () {
      spyOn(collection, 'getFromLocalStorage').and.returnValue('this simple string');

      expect(function () {
        collection.fetch();
      }).toThrowError('Error with parsing forecast data from localStorage');
    });

    it('#citiesCollection.fetch should add collection from localStorage and trigger event "fetch"', function () {
      spyOn(collection, 'getFromLocalStorage').and.returnValue(collectionMock);
      spyOn(collection, 'add');
      spyOn(collection, 'trigger');

      collection.fetch();

      expect(collection.add).toHaveBeenCalled();
      expect(collection.trigger).toHaveBeenCalledWith('fetch');
    });

    it('#citiesCollection.save should save collection to localStorage', function () {
      spyOn(collection, 'getFromLocalStorage').and.returnValue(collectionMock);
      spyOn(collection, 'setToLocalStorage');

      collection.fetch();
      collection.save();

      expect(collection.setToLocalStorage).toHaveBeenCalled();
    });

    it('#citiesCollection.removeModels argument should be array', function () {
      spyOn(collection, 'getFromLocalStorage').and.returnValue(collectionMock);
      spyOn(collection, 'trigger');

      expect(function () {
        collection.removeModels(null);
      }).toThrowError('citiesIDs should be array');

      expect(function () {
        collection.removeModels({});
      }).toThrowError('citiesIDs should be array');

      expect(function () {
        collection.removeModels(1);
      }).toThrowError('citiesIDs should be array');

      expect(function () {
        collection.removeModels('string');
      }).toThrowError('citiesIDs should be array');
    });

    it('#citiesCollection.removeModels', function () {
      spyOn(collection, 'getFromLocalStorage').and.returnValue(collectionMock);
      spyOn(collection, 'trigger');

      collection.fetch();
      collection.removeModels(['ChIJRcbZaklDXz4RYlEphFBu5r0']);

      expect(collection.trigger).toHaveBeenCalledWith('update');
    });

    it('#citiesCollection.find should return model from collection by placeId', function () {
      var model = {
        data: {
          placeData: {
            placeID: 'ChIJRcbZaklDXz4RYlEphFBu5r0'
          }
        }
      };
      collection.models[model.data.placeData.placeID] = model;
      expect(collection.find('ChIJRcbZaklDXz4RYlEphFBu5r0')).toEqual(model);
    });

    it('#collection.getIndexOf return index of model from collection', function () {
      var model1 = {
        data: {
          placeData: {
            placeID: 'ChIJRcbZaklDXz4RYlEphFBu5r0'
          }
        }
      };

      var model2 = {
        data: {
          placeData: {
            placeID: 'ChIJRcbZaklDXz4RYlEphFBu5r1'
          }
        }
      };

      collection.models[model1.data.placeData.placeID] = model1;
      collection.models[model2.data.placeData.placeID] = model2;

      expect(collection.getIndexOf('ChIJRcbZaklDXz4RYlEphFBu5r1')).toBe(1);
    });

    it('#collection.getByIndex return model by index', function () {
      var model1 = {
        data: {
          placeData: {
            placeID: 'ChIJRcbZaklDXz4RYlEphFBu5r0'
          }
        }
      };

      var model2 = {
        data: {
          placeData: {
            placeID: 'ChIJRcbZaklDXz4RYlEphFBu5r1'
          }
        }
      };

      collection.models[model1.data.placeData.placeID] = model1;
      collection.models[model2.data.placeData.placeID] = model2;

      expect(collection.getByIndex(1)).toEqual(model2);
    });

    it('#citiesCollection.refresh refresh collection and triggers event "fetch"', function () {
      spyOn(forecastAPI, 'fetch');

      collection.refresh();

      expect(forecastAPI.fetch).toHaveBeenCalled();
    });

    it('#citiesCollection.setToLocalStorage set collection to localStorage', function () {
      var data = { data : {} };
      spyOn(window.localStorage, 'setItem');
      citiesCollection.setToLocalStorage(data);
      expect(window.localStorage.setItem).toHaveBeenCalledWith(citiesCollection.STORAGEKEY, data);
    });

    it('#citiesCollection.getFromLocalStorage get collection from localStorage', function () {
      spyOn(window.localStorage, 'getItem');
      citiesCollection.getFromLocalStorage();
      expect(window.localStorage.getItem).toHaveBeenCalledWith(citiesCollection.STORAGEKEY);
    });
  });
});


