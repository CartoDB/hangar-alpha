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
HangarAlpha.Views.Card = Backbone.View.extend({

  events: {
    'click': '_onClickCardContent'
  },

  initialize: function() {
    this.model = new Backbone.Model();
  },

  _onClickCardContent: function(e) {
    var $card = this.$el

    $card.addClass('is-download');

    setTimeout(function(){
     $card.removeClass('is-download');
    }, 3000);
  }
});
HangarAlpha.Views.Dialog = Backbone.View.extend({

  el: '.js-Dialog',

  events: {
    'click .js-Dialog-buttonClose': '_closeContactDialog'
  },

  initialize: function () {
    this.model = new Backbone.Model({ hidden: true })

    this.model.on('change:hidden', this._toggleDialog, this)
  },

  close: function () {
    if (!this.model.get('hidden')) {
      this.model.set('hidden', true)
    }
  },

  open: function () {
    if (this.model.get('hidden')) {
      this.model.set('hidden', false)
    }
  },

  _closeContactDialog: function (e) {
    e.preventDefault()

    this.close()
  },

  _toggleDialog: function () {
    var _this = this

    if (this.model.get('hidden')) {
      this.$el.addClass('is-closing')

      setTimeout(function () {
        _this.$el.removeClass('is-active')
        _this.$el.removeClass('is-closing')
      }, 100)
    } else {
      this.$el.addClass('is-active')
    }
  }

})

HangarAlpha.Views.Dropdown = Backbone.View.extend({

  events: {
    'mouseenter': '_displayDropdown',
    'mouseleave' : '_hideDropdown',
    'click .js-Dropdown-target': '_checkDevice'//,
    // 'click .js-Dropdown-inner': 'close'
  },

  initialize: function() {
    this.$dropdown = this.$('.js-Dropdown-inner');
    this.model = new Backbone.Model({ hidden: true });
  },

  _checkDevice: function(e) {
    var touch = this._checkTouch()
    if (touch) {
      this._onTouch(e);
    }
  },

  _checkTouch: function() {
    try { 
      document.createEvent("TouchEvent");
      return true;
    }
      catch(e) {
      return false;
    }
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
  },

});
HangarAlpha.Views.Navbar = Backbone.View.extend({

  el: '.js-Navbar',

  events: {
    'click .js-Navbar-button': '_openMobileMenu'
  },

  initialize: function() {
    this.$navMobile = this.$('.js-Navbar-mobile');
    this.$navButton = this.$('.js-Navbar-button');
    this.$navLogo = this.$('.js-Navbar-logo');
    this.model = new Backbone.Model({ hidden: true });
    this.model.on("change:hidden", this._toggleNavbar, this);
  },

  _onClickNavbarButton: function() {
    this.model.set('hidden', !this.model.get('hidden'));
  },

  _toggleNavbar: function() {
    if (this.model.get('hidden')) {
      //Close menu
      this.$navMobile.removeClass('is-active');
      $('body').removeClass("u-overflow");
      $('.Announcement').show();
      this._toggleViewportScrolling(false)
    } else {
       //Open menu
      this.$navMobile.addClass('is-active');
      $('body').addClass("u-overflow");
      $('.Announcement').hide();
      this._toggleViewportScrolling(true)
    }
  },

  _openMobileMenu: function() {
    this.$navButton.toggleClass('open');
    this.$navLogo.toggleClass('open');
    this._onClickNavbarButton();
  },

  _toggleViewportScrolling: function(bool) {
    if (bool === true) {
      document.body.ontouchmove = function(e) {
        e.preventDefault();
      }
    } else {
      document.body.ontouchmove = function(e) {
        return true;
      }
    }
  }
});

HangarAlpha.Views.NavbarFixed = Backbone.View.extend({

  initialize: function(options) {
    this.options = options;

    this.$header = this.options.$header;
    this.$navbarButton = this.$('.js-Navbar-button')

    this._initBindings();
  },

  _fixMenu: function() {
    var headerHeight = this.$header.outerHeight();
    var scrollNumber = document.body.scrollTop;

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
