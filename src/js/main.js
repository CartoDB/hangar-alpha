window.HangarAlpha = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {}
};

HangarAlpha.Views.Main = Backbone.View.extend({

	el: 'body',

  events: {
    'click .js-ContactLink': '_onClickContactLink',
    'click .js-ReadMore': '_onClickReadMore'
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

    this.card = new HangarAlpha.Views.Card({
      el: this.$('.js-downloadCard')
    })
  },


	_initDropdowns: function () {
    var _this = this;

    _.each(this.$('.js-Dropdown'), function (el) {
      var dropdown = new HangarAlpha.Views.Dropdown({
        el: $(el)
      })
    })
  }

})


$(function () {
  window.main = new HangarAlpha.Views.Main()
})