HangarAlpha.Views.Dropdown = Backbone.View.extend({

  events: {
    'mouseenter': '_displayDropdown',
    'mouseleave' : '_hideDropdown',
    'click .js-Dropdown-target': '_onTouch',
    'click .js-Dropdown-inner': 'close'
  },

  initialize: function() {
    this.$dropdown = this.$('.js-Dropdown-inner');
    this.model = new Backbone.Model({ hidden: true });
  },

  _displayDropdown: function() {
    this.close();
    this.$dropdown.show();
    this._toggleHidden();
  },

  _hideDropdown: function() {
    this.$dropdown.hide();
    this._toggleHidden();
  },

  _onTouch: function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.model.get('hidden') ? this._displayDropdown() : this._hideDropdown();
  },

  _toggleHidden: function() {
    this.model.set('hidden', !this.model.get('hidden'));
  },

  close: function() {
    $('.js-Dropdown-inner').hide();
  }
});