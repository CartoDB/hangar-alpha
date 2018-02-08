const $ = require('jquery');
const Dialog = require('../src/js/components/dialog');

describe('Dialog', function () {
  beforeEach(function () {
    jasmine.clock().install();
    this.element = $(
      '<div class="js-Dialog"><button class="js-Dialog-buttonClose">Close</button></div>'
    );
    this.view = new Dialog({
      el: this.element
    });
    this.view.render();
  });

  afterEach(function () {
    jasmine.clock().uninstall();
  });

  it('close', function () {
    this.view.close();
    expect(this.view.model.get('hidden')).toBe(true);
  });

  it('open', function () {
    this.view.open();
    expect(this.view.model.get('hidden')).toBe(false);
    expect(this.view.$el).toHaveClass('is-active');
  });

  it('toggle dialog', function () {
    this.view.open();
    expect(this.view.model.get('hidden')).toBe(false);

    this.view.close();
    expect(this.view.model.get('hidden')).toBe(true);
    expect(this.view.$el).toHaveClass('is-active');
    expect(this.view.$el).toHaveClass('is-closing');
    jasmine.clock().tick(200);
    expect(this.view.$el).not.toHaveClass('is-active');
    expect(this.view.$el).not.toHaveClass('is-closing');
  });
});
