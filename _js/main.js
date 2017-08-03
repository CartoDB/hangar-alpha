window.HangarAlpha = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {}
};

HangarAlpha.Views.Main = Backbone.View.extend({

	el: 'body',

  events: {
    'click': '_closeDropdowns',
    'click .js-ContactLink': '_onClickContactLink',
    'click .js-ReadMore': '_onClickReadMore',
    'keydown': '_onKeyDown'
  },


	initialize: function () {
    this._initViews();
  },

  _initViews: function () {
  	this._initDropdowns();
    this.navbar = new HangarAlpha.Views.Navbar()
    this.navbar_fixed = new HangarAlpha.Views.NavbarFixed({
       el: this.$('.js-Navbar--fixed'),
     });
  },


	_initDropdowns: function () {
    var _this = this;

    _.each(this.$('.js-Dropdown'), function (el) {
      var dropdown = new HangarAlpha.Views.Dropdown({
        el: $(el)
      })

      // dropdown.bind('onclickdropdownlink', function () {
      //   _this._closeDropdowns()
      // })

      _this.bind('closedropdowns', function () {
        dropdown.close()
      })
    })
  },

  _onKeyDown: function (e) {
    switch (e.which) {
      // esc
      case 27 :
        this._closeDropdowns()
        break
    }
  }//,
  
  _closeDropdowns: function () {
    this.trigger('closedropdowns')
  }
})


$(function () {
  window.main = new HangarAlpha.Views.Main()
})