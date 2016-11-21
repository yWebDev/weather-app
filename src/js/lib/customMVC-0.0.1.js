/**
 * Created by Yurii_Shpakovych on 5/11/2016.
 */
/* globals define, _, jQuery, Backbone */
define(['underscore', 'backbone'], function (_, Backbone) {
  var initCustomMVC = function () {
    // vars
    var customMVC = {};
    var Model;
    var Collection;
    var View;
    var Controller;

    function create(attributes, parent) {
      var child = Object.create(parent.prototype);
      _.extend(child, attributes);
      child.initialize.apply(child, arguments);
      return child;
    }

    /**
     * Model
     */
    Model = function () {
    };

    _.extend(Model.prototype, Backbone.Events, {

      uid: '',

      initialize: function () {
      },

      set: function (key, value) {
        this.data[key] = value;
        this.trigger('change');
      },

      toJSON: function () {
        return _.clone(this.data);
      }
    });

    Model.prototype.create = function (attributes) {
      var model = create(attributes, Model);
      model.uid = _.uniqueId('cMVC_model_');
      return model;
    };

    customMVC.Model = new Model();

    /**
     * Collection
     */
    Collection = function () {
    };

    _.extend(Collection.prototype, Backbone.Events, {
      uid: '',

      initialize: function () {
      },

      getModels: function () {
        return this.models;
      },

      add: function (model) {
        if (_.isArray(model)) {
          model.forEach(function (item) {
            this.models[item.uid] = item;
          }, this);
        } else {
          this.models[model.uid] = model;
        }
        this.trigger('update');
      },

      fetch: function () {

      }

    });

    Collection.prototype.create = function (models) {
      var collection = create({}, Collection);
      collection.models = {};
      collection.uid = _.uniqueId('cMVC_collection_');
      if (typeof models !== 'undefined') {
        collection.add(models);
      }
      return collection;
    };

    customMVC.Collection = new Collection();
    /**
     * View
     */
    View = function () {
    };

    _.extend(View.prototype, Backbone.Events, {
      uid: '',
      model: {},

      template: function () {
      },

      initialize: function () {
      },

      get: function () {
        return this.template(this.model.toJSON());
      }
    })
    ;

    View.prototype.create = function (attributes) {
      var view = create(attributes, View);
      view.uid = _.uniqueId('cMVC_view_');
      return view;
    };

    customMVC.View = new View();

    /**
     * Controller
     */
    Controller = function () {
    };

    _.extend(Controller.prototype, Backbone.Events, {
      uid: '',

      initialize: function () {
      }
    });

    Controller.prototype.create = function (attributes) {
      var controller = create(attributes, Controller);
      controller.uid = _.uniqueId('cMVC_controller_');
      return controller;
    };

    customMVC.Controller = new Controller();

    return customMVC;
  };
  return initCustomMVC();
});
