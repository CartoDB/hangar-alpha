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
      $header: document.querySelector('#triggerFixed'),
      after: true
    });

    this._initDropdowns();
  },

  _initDropdowns: function () {
    _.each(this.$('.js-Dropdown'), function (el) {
      /* eslint-disable */
      new Hangar.Dropdown({
        el: $(el)
      });
      /* eslint-enable */
    });
  }
});

$(() => {
  /* eslint-disable */
  new Main();
  /* eslint-enable */
});
