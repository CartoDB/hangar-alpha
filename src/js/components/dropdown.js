const Backbone = require('backbone');

module.exports = Backbone.View.extend({
  events: {
    mouseenter: '_displayDropdown',
    mouseleave: '_hideDropdown',
    'click .js-Dropdown-target': '_checkDevice'
  },

  initialize: function () {
    this.$dropdown = this.$('.js-Dropdown-inner');
    this.model = new Backbone.Model({
      hidden: true,
      touch: this._checkTouch()
    });
  },

  _checkDevice: function (e) {
    var touch = this.model.get('touch');
    if (touch) {
      this._onTouch(e);
    }
  },

  _checkTouch: function () {
    try {
      document.createEvent('TouchEvent');
      return true;
    } catch (e) {
      return false;
    }
  },

  _displayDropdown: function () {
    this.close();
    this.$dropdown.show();
    this._toggleHidden();
  },

  _hideDropdown: function () {
    this.$dropdown.hide();
    this._toggleHidden();
  },

  _onTouch: function (e) {
    e.preventDefault();
    e.stopPropagation();
    this.model.get('hidden') ? this._displayDropdown() : this._hideDropdown();
  },

  _toggleHidden: function () {
    this.model.set('hidden', !this.model.get('hidden'));
  },

  close: function () {
    this.$dropdown.hide();
  }
});
