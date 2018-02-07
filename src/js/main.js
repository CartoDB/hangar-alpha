const Backbone = require('backbone');
const _ = require('underscore');
const $ = require('jquery');

const Navbar = require('./components/navbar');
const NavbarFixed = require('./components/navbar-fixed');
const Dialog = require('./components/dialog');
const Card = require('./components/card');
const Dropdown = require('./components/dropdown');
const Tab = require('./components/tab');

module.exports = Backbone.View.extend({

  el: 'body',

  events: {
    'click .js-ContactLink': '_onClickContactLink'
  },

  initialize: function () {
    this._initViews();
  },

  _initViews: function () {
    this.navbar = new Navbar();
    this.navbarFixed = new NavbarFixed({
      el: this.$('.js-Navbar--fixed'),
      $header: this.$('.js-Header')[0]
    });
    this._initDropdowns();

    this.dialog = new Dialog();

    this.card = new Card({
      el: this.$('.js-downloadCard')
    });

    this._initTabs();
  },

  _initTabs: function () {
    var _this = this;

    _.each(this.$('.js-Tabs'), function (el) {
      var tab = new Tab({
        el: $(el)
      });
    })
  },


  _initDropdowns: function () {
    var _this = this;

    _.each(this.$('.js-Dropdown'), function (el) {
      var dropdown = new Dropdown({
        el: $(el)
      })
    })
  },

  _onKeyDown: function (e) {
    switch (e.which) {
      // esc
      case 27:
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
});
