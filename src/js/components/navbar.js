const Backbone = require('backbone');
const $ = require('jquery');
const HangarUser = require('./user');


module.exports = Backbone.View.extend({
  el: '.js-Navbar',

  events: {
    'click .js-Navbar-button': '_openMobileMenu',
    'focusin .js-expand-search-box': '_expandSearch',
    'focusout .js-expand-search-box': '_hideSearch'
  },

  initialize: function () {
    this.$navMobile = this.$('.js-Navbar-mobile');
    this.$navButton = this.$('.js-Navbar-button');
    this.$navLogo = this.$('.js-Navbar-logo');
    this.model = new Backbone.Model({ hidden: true });
    this.model.on('change:hidden', this._toggleNavbar, this);
    this.user = new HangarUser();
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

  _expandSearch: function(){
    this.$navLogo.addClass("Logo--hide");
    this.$navButton.addClass("open");
    this.$navButton.addClass("js-close-search");
    this.$navButton.addClass("u-noPointerEvents");
  },

  _hideSearch: function(){
    this.$navLogo.removeClass("Logo--hide");
    this.$navButton.removeClass("open");
    this.$navButton.removeClass("js-close-search");
    this.$navButton.removeClass("u-noPointerEvents");
  },

  _openMobileMenu: function () {
    if (!this.$navButton.hasClass("js-close-search"))
    {
      this.$navButton.toggleClass('open');
      this.$navLogo.toggleClass('open');
      this._onClickNavbarButton();
    }
  },

  _toggleViewportScrolling: function (bool) {
    document.body.ontouchmove = function (e) {
      if (!bool) return true;
      e.preventDefault();
    };
  },
});
