const Backbone = require('backbone');

module.exports = Backbone.View.extend({
  events: function(){
    var events;
    this.activateOnClick = this.el.classList.contains('js-Dropdown--onClick');
    if (this.activateOnClick){
      events = {
        'click .js-Dropdown-target': '_onTouch'
      }
    }
    else {
      events = {
        mouseenter: '_displayDropdown',
        mouseleave: '_hideDropdown',
        'click .js-Dropdown-target': '_checkDevice'
      }
    }
    return events;
  },

  initialize: function (options) {
    this.$dropdown = this.$('.js-Dropdown-inner');
    this.model = new Backbone.Model({
      hidden: true,
      touch: this._checkTouch()
    });
    this._initBodyListener();
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

  _initBodyListener(){
    if(this.$el.hasClass("js-Dropdown--onClick")){
      var dropdownClass = this;
      document.body.addEventListener('click', function(event){
        if (!event.target.closest(".js-Dropdown")){
          dropdownClass.model.set('hidden', false);
          dropdownClass._onTouch(event);
        }
      });
    }
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
