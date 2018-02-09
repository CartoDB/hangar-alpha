const Backbone = require('backbone');

module.exports = Backbone.View.extend({
  events: {
    'click .js-Tab': 'switchTab'
  },

  initialize: function () {
    this.render();
  },

  switchTab: function (event) {
    event.preventDefault();
    var selectedTab = event.currentTarget;
    this.$('.js-Tab.is-active').removeClass('is-active');
    this.$(selectedTab).addClass('is-active');
    this.render();
  },

  render: function () {
    var idTab =
      this.$el.find('.js-Tab.is-active').length !== 0
        ? this.$el.find('.js-Tab.is-active').attr('href')
        : this.$el
          .find('.js-Tab')
          .first()
          .attr('href');
    this.renderTabs(idTab);
  },

  renderTabs: function (idTab) {
    this.$el.find('.js-tab-content').removeClass('is-active');
    this.$el.find(idTab).addClass('is-active');
  }
});
