HangarAlpha.Views.NavbarFixed = Backbone.View.extend({

  initialize: function(options) {
    this.options = options;

    this.$header = this.options.$header;
    this.$navbarButton = this.$('.js-Navbar-button')

    this._initBindings();
  },

  _fixMenu: function() {
    var headerHeight = this.$header.outerHeight();
    var scrollNumber = $(window).scrollTop();

    if (scrollNumber >= headerHeight) {
      this.$el.addClass('Navbar--fixed is-active');
    } else {
      this.$el.removeClass('Navbar--fixed is-active');
    }
  },

  _initBindings: function() {
    var _this = this;

    $(document)
      .ready(function() {
        _this._fixMenu();
      });

    $(window)
      .scroll(function() {
        _this._fixMenu();
      })
      .resize(function() {
        _this._fixMenu();
      });
  }
});
