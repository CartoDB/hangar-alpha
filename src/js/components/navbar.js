const Backbone = require('backbone');
const $ = require('jquery');

module.exports = Backbone.View.extend({
  el: '.js-Navbar',

  events: {
    'click .js-Navbar-button': '_openMobileMenu'
  },

  initialize: function () {
    this.$navMobile = this.$('.js-Navbar-mobile');
    this.$navButton = this.$('.js-Navbar-button');
    this.$navLogo = this.$('.js-Navbar-logo');
    this.model = new Backbone.Model({ hidden: true });
    this.model.on('change:hidden', this._toggleNavbar, this);
  },

  _onClickNavbarButton: function () {
    this.model.set('hidden', !this.model.get('hidden'));
  },

  _toggleNavbar: function () {
    const isHidden = this.model.get('hidden');

    this.$navMobile.toggleClass('is-active', !isHidden);
    $('body').toggleClass('u-overflow', !isHidden);
    $('.Announcement').display(isHidden);
    this._toggleViewportScrolling(!isHidden);
  },

  _openMobileMenu: function () {
    this.$navButton.toggleClass('open');
    this.$navLogo.toggleClass('open');
    this._onClickNavbarButton();
  },

  _toggleViewportScrolling: function (bool) {
    document.body.ontouchmove = function (e) {
      if (!bool) return true;
      e.preventDefault();
    };
  }
});
