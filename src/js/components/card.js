const Backbone = require('backbone');

module.exports = Backbone.View.extend({
  events: {
    'click': '_onClickCardContent'
  },

  _onClickCardContent: function (e) {
    var $card = this.$el;

    $card.addClass('is-download');

    setTimeout(function () {
      $card.removeClass('is-download');
    }, 3000);
  }
});
