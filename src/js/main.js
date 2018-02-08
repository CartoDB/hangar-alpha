const Backbone = require('backbone');
const _ = require('underscore');
const $ = require('jquery');

const Hangar = window.HangarAlpha.Components;

const Main = Backbone.View.extend({
  el: 'body',

  events: {
    'click .js-ContactLink': '_onClickContactLink'
  },

  initialize: function () {
    this._initViews();
  },

  _initViews: function () {
    this.navbar = new Hangar.Navbar();
    this.navbarFixed = new Hangar.NavbarFixed({
      el: this.$('.js-Navbar--fixed'),
      $header: this.$('.js-Header')[0]
    });
    this._initDropdowns();

    this.dialog = new Hangar.Dialog();

    this.card = new Hangar.Card({ el: this.$('.js-downloadCard') });

    this._initTabs();
  },

  _initTabs: function () {
    _.each(this.$('.js-Tabs'), function (el) {
      new Hangar.Tab({
        el: $(el)
      });
    });
  },

  _initDropdowns: function () {
    _.each(this.$('.js-Dropdown'), function (el) {
      new Hangar.Dropdown({
        el: $(el)
      });
    });
  },

  _onKeyDown: function (e) {
    switch (e.which) {
      // esc
      case 27:
        this._closeContactDialog();
        break;
    }
  },

  _closeDialogs: function () {
    this.dialog.close();
  },

  _onClickContactLink: function (e) {
    var mobile = 1280;
    var width = $(window).width();

    if (width >= mobile) {
      e.preventDefault();
      this.dialog.open();
    }
  }
});

$(() => {
  new Main();
});
