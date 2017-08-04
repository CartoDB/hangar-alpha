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