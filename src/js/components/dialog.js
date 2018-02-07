const Backbone = require('backbone');

module.exports = Backbone.View.extend({

  el: '.js-Dialog',

  events: {
    'click .js-Dialog-buttonClose': '_closeContactDialog'
  },

  initialize: function () {
    this.model = new Backbone.Model({ hidden: true });
    this.model.on('change:hidden', this._toggleDialog, this);
  },

  close: function () {
    if (!this.model.get('hidden')) {
      this.model.set('hidden', true);
    }
  },

  open: function () {
    if (this.model.get('hidden')) {
      this.model.set('hidden', false);
    }
  },

  _closeContactDialog: function (e) {
    e.preventDefault();
    this.close();
  },

  _toggleDialog: function () {
    var _this = this;

    if (this.model.get('hidden')) {
      this.$el.addClass('is-closing');

      setTimeout(function () {
        _this.$el.removeClass('is-active');
        _this.$el.removeClass('is-closing');
      }, 100);
    } else {
      this.$el.addClass('is-active');
    }
  }
});
