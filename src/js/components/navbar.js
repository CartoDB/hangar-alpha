HangarAlpha.Views.Navbar = Backbone.View.extend({

  el: '.js-Navbar',

  events: {
    'click .js-Navbar-button': '_openMobileMenu'
  },

  initialize: function() {
    this.$navMobile = this.$('.js-Navbar-mobile');
    this.$navButton = this.$('.js-Navbar-button');
    this.model = new Backbone.Model({ hidden: true });
    this.model.on("change:hidden", this._toggleNavbar, this);
  },

  _onClickNavbarButton: function() {
    this.model.set('hidden', !this.model.get('hidden'));
  },

  _toggleNavbar: function() {
    if (this.model.get('hidden')) {
      $('body').removeClass("u-overflow");
      this.$navMobile.removeClass('is-active');
      $('.Announcement').show();
      // this._stopBodyScrolling(false)
    } else {
      $('body').addClass("u-overflow");
      this.$navMobile.addClass('is-active');
      $('.Announcement').hide();
      // this._stopBodyScrolling(true)
    }
  },

  _openMobileMenu: function() {
    this.$navButton.toggleClass('open');
    this._onClickNavbarButton();
  },

  _stopBodyScrolling: function(bool) {
    var freezeVp = function(e) {
      e.preventDefault();
    };
    if (bool === true) {
      document.body.addEventListener("touchmove", freezeVp, false);
    } else {
      document.body.addEventListener("touchmove", freezeVp, true);

    }
  }

});
