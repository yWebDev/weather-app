/**
 * Created by Юрий on 12.05.2016.
 */
/* globals define */
define([
  'jquery',
  'customMVC',
  'underscore',
  'text!../templates/search-list-item.html',
  'text!../templates/search-list-no-results-view.html'
], function (jQuery, customMVC, _, template, templateNoResults) {
  var searchView = customMVC.View.create({

    el: jQuery('#search-list')[0],
    input: jQuery('#search-input')[0],
    button: jQuery('#toggle-search')[0],
    addButton: jQuery('#remove-add')[0],
    placeChecksClassName: '.place-check',
    placeChecksLabelClassName: '.checkbox-wrapper',
    template: _.template(template),
    templateNoResults: templateNoResults,
    clickableListItemsClassName: '.places-list__item--clickable',

    render: function (predictionsArray) {
      var listHtml = '';
      if (!predictionsArray || predictionsArray.length === 0) {
        jQuery(this.el).html(this.templateNoResults);
        return;
      }
      _.each(predictionsArray, function (prediction) {
        listHtml += searchView.template(prediction);
      });
      jQuery(this.el).html(listHtml);
      this.trigger('render');
    },

    show: function () {
      jQuery(this.button).addClass('active');
      jQuery(this.el).html(this.templateNoResults);
      jQuery(this.el).removeClass('hidden').addClass('scrollbar-inner').scrollbar();
      jQuery(this.input).val('').removeClass('hidden').focus();
      this.trigger('show');
    },

    hide: function () {
      jQuery(this.button).removeClass('active');
      jQuery(this.el).removeClass('scrollbar-inner').addClass('hidden');
      jQuery(this.el).scrollbar('destroy');
      jQuery(this.input).addClass('hidden');
      this.trigger('hide');
    },

    disableAdding: function () {
      if (jQuery(this.addButton).hasClass('icon-check')) {
        jQuery(this.addButton).removeClass('icon-check').addClass('icon-delete');
      }
    },

    enableAdding: function () {
      if (jQuery(this.addButton).hasClass('icon-delete')) {
        jQuery(this.addButton).removeClass('icon-delete').addClass('icon-check');
      }
    },

    initialize: function () {
      var self = this;

      jQuery(this.button).click(function () {
        if (!jQuery(this).hasClass('icon-add')) {
          return;
        }

        if (!jQuery(this).hasClass('active')) {
          self.show();
        } else {
          self.hide();
        }
      });

      jQuery(this.addButton).click(function (event) {
        if (!jQuery(this).hasClass('icon-check')) {
          return;
        }
        jQuery(this).removeClass('active');
        self.trigger('click searchView:addButton');
        event.stopImmediatePropagation();
      });
    }

  });
  return searchView;
});
