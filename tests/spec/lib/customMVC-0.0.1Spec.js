/**
 * Created by Yurii_Shpakovych on 6/15/2016.
 */
/* globals define */
define(['customMVC'], function (customMVC) {
  describe('#customMVC', function () {
    it('#customMVC.Model.set should set value to model data', function () {
      var model = customMVC.Model.create({ data: {} });
      spyOn(model, 'trigger');
      model.set('key', 'value');
      expect(model.trigger).toHaveBeenCalledWith('change');
      expect(model.data.key).toEqual('value');
    });

    it('#customMVC.Collection defaults methods should be exists', function () {
      var collection = customMVC.Collection.create();
      expect(typeof collection.uid).toEqual('string');
      expect(typeof collection.fetch).toEqual('function');
    });

    it('#customMVC.Collection.getModels should returns models', function () {
      var model = customMVC.Model.create({ data: { key: 'val' } });
      var model2 = customMVC.Model.create({ data: { key2: 'val2' } });
      var collection = customMVC.Collection.create([model, model2]);
      var models = {};
      models[model.uid] = model;
      models[model2.uid] = model2;
      expect(collection.getModels()).toEqual(models);
    });

    it('#customMVC.Collection.add should add new model to collection', function () {
      var model = customMVC.Model.create({ data: { key: 'val' } });
      var collection = customMVC.Collection.create();
      var models = {};
      models[model.uid] = model;
      collection.add(model);
      expect(collection.getModels()).toEqual(models);
    });

    it('#customMVC.View defaults methods should be exists', function () {
      var view = customMVC.View.create({});

      expect(typeof view.uid).toEqual('string');
      expect(typeof view.initialize).toEqual('function');
      expect(typeof view.template).toEqual('function');
      expect(typeof view.get).toEqual('function');
    });

    it('#customMVC.Controller defaults methods should be exists', function () {
      var controller = customMVC.Controller.create({});
      expect(typeof controller.uid).toEqual('string');
      expect(typeof controller.initialize).toEqual('function');
    });
  });
});
