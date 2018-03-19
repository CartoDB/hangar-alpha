const $ = require('jquery');
const Card = require('../src/js/components/card');

describe('Card', () => {
  beforeEach(function () {
    this.element = $('<div></div>');
    this.view = new Card({
      el: this.element
    });
    this.view.render();
  });

  it('has is-download css class when click', function () {
    jasmine.clock().install();
    this.element.trigger('click');
    expect(this.view.$el).toHaveClass('is-download');
    jasmine.clock().tick(4000);
    expect(this.view.$el).not.toHaveClass('is-download');
    jasmine.clock().uninstall();
  });
});
