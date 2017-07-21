HangarAlpha.Views.NavbarFixed = Backbone.View.extend({

  el: this.$('.js-Navbar--fixed'),
  header: this.$('.js-Header'),

  initialize: function(options) {
    this.options = options;

    this.$header = this.header;

    this._initBindings();
  },

  _fixMenu: function() {
    var headerHeight = this.$header.outerHeight();
    var scrollNumber = document.body.scrollTop;

    if (scrollNumber >= headerHeight) {
      this.$el.addClass('is-active');
      this.$el.addClass('bgWhite Navbar--fixed');
    } else {
      this.$el.removeClass('is-active');
      this.$el.removeClass('bgWhite Navbar--fixed')
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
