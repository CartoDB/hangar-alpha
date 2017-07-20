window.HangarAlpha = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {}
};

HangarAlpha.Views.Main = Backbone.View.extend({

	el: 'body',

  events: {
    'click': '_closeDropdowns'
  },


	initialize: function () {
    this._initViews();
  },

  _initViews: function () {
  	this._initDropdowns();
  	this.navbar_fixed = new HangarAlpha.Views.NavbarFixed({
      el: this.$('.js-Navbar--fixed'),
      $header: this.$('.js-Header')
    });
  },


	_initDropdowns: function () {
    var _this = this;

    _.each(this.$('.js-Dropdown'), function (el) {
      var dropdown = new HangarAlpha.Views.Dropdown({
        el: $(el)
      })

      dropdown.bind('onclickdropdownlink', function () {
        _this._closeDropdowns()
      })

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
  },
  
  _closeDropdowns: function () {
    this.trigger('closedropdowns')
  }
})


$(function () {
  window.main = new HangarAlpha.Views.Main()
})
HangarAlpha.Views.Dropdown = Backbone.View.extend({

  events: {
    'click': '_onClickDropdown',
    'click .js-Dropdown-target': '_onClickDropdownLink'
  },

  initialize: function() {
    this.$dropdown = this.$('.js-Dropdown-inner');

    this.model = new Backbone.Model({ hidden: true });

    this.model.on("change:hidden", this._toggleDropdown, this);
  },

  _onClickDropdown: function(e) {
    if (!$(e.target).hasClass('js-Dropdown-link')) {
      e.preventDefault();
      e.stopPropagation();
    }
  },

  close: function() {
    if (!this.model.get('hidden')) {
      this.model.set('hidden', true);
    }
  },

  _onClickDropdownLink: function(e) {
    e.preventDefault();

    if (this.model.get('hidden')) {
      this.trigger('onclickdropdownlink');
    }

    this.model.set('hidden', !this.model.get('hidden'));
  },

  _toggleDropdown: function() {
    this.$dropdown.toggleClass('is-active', !this.model.get('hidden'));
  }
});

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
      this.$el.addClass('bgWhite u-positive Navbar--fixed');
    } else {
      this.$el.removeClass('is-active');
      this.$el.removeClass('bgWhite u-positive Navbar--fixed')
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
