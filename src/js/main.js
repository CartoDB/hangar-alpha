window.HangarAlpha = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {}
};

HangarAlpha.Views.Main = Backbone.View.extend({

	el: 'body',

  events: {
    'click .js-ContactLink': '_onClickContactLink'
  },

	initialize: function () {
    this._initViews();
  },

  _initViews: function () {
    this.navbar = new HangarAlpha.Views.Navbar()
    this.navbar_fixed = new HangarAlpha.Views.NavbarFixed({
      el: this.$('.js-Navbar--fixed'),
      $header: this.$('.js-Header')
     });
    this._initDropdowns();

    this.dialog = new HangarAlpha.Views.Dialog();

    this.card = new HangarAlpha.Views.Card({
      el: this.$('.js-downloadCard')
    });

    this._initTabs();

  },

  _initTabs: function () {
    var _this = this;

    _.each(this.$('.js-Tabs'), function (el) {
      var tab = new HangarAlpha.Views.Tab({
        el: $(el)
      })
    })
  },


	_initDropdowns: function () {
    var _this = this;

    _.each(this.$('.js-Dropdown'), function (el) {
      var dropdown = new HangarAlpha.Views.Dropdown({
        el: $(el)
      })
    })
  },

  _onKeyDown: function (e) {
    switch (e.which) {
      // esc
      case 27 :
        this._closeContactDialog()
        break
    }
  },

  _closeDialogs: function () {
    this.dialog.close()
  },

  _onClickContactLink: function (e) {
    var mobile = 1280
    var width = $(window).width()

    if (width >= mobile) {
      e.preventDefault()

      this.dialog.open()
    }
  }

})


$(function () {
  window.main = new HangarAlpha.Views.Main()
})