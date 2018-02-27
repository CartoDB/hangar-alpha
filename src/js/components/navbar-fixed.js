const Backbone = require('backbone');
const $ = require('jquery');
const _ = require('underscore');

module.exports = Backbone.View.extend({
  initialize: function (options) {
    this.options = options;
    this.$window = $(window);
    this.$header = this.options.$header;
    this.after = this.options.after;
    this.$navbarButton = this.$('.js-Navbar-button');

    _.bindAll(this, '_fixMenu');
    this._fixMenu = _.throttle(this._fixMenu, 50);

    this._initBindings();
  },

  _fixMenu: function () {
    var headerHeight = this.$header.offsetTop;
    if (this.after) {
      headerHeight = headerHeight + $(this.$header).outerHeight();
    }
    var scrollNumber = this.$window.scrollTop();
    this.$el.toggleClass(
      'Navbar--fixed is-active',
      scrollNumber >= headerHeight
    );
  },

  _initBindings: function () {
    $(document).ready(this._fixMenu);

    this.$window.on('scroll', this._fixMenu);
    this.$window.on('resize', this._fixMenu);
  },

  remove: function () {
    this.$window.off('scroll', this._fixMenu);
    this.$window.off('resize', this._fixMenu);
    Backbone.View.prototype.remove.call(this, arguments);
  }
});
