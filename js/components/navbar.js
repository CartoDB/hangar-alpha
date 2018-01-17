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
