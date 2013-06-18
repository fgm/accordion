describe("Jasmine 101", function() {
  it("Expect accordion to be defined", function() {
    expect(accordion).toBeDefined(true);
  });
});


describe('Accordion.initClasses()', function () {
  var $;
  var backup;
  var root = '.accordion';

  // Preserve markup and jQuery.
  beforeEach(function () {
    $ = accordion.$;
    backup = $(root).html();
  });

  // Restore initial markup.
  afterEach(function () {
    $(root).html(backup);
  });

  // This test checks initClasses() for headers.
  it('Should contain exactly one active header.', function () {
    expect($(root + ' h2.accordion-active').length).toBe(0);
  });
  it('Should have tagged all its headers and only them', function () {
    expected = $(root + ' h2').length;
    actual = $('.accordion-header').length;
    expect(actual).toBe(expected);
  });

  // This test checks initClasses() for panes.
  it('Should contain exactly three panes', function () {
    expected = $(root + ' ul').length;
    actual = $('.accordion-pane').length;
    expect(actual).toBe(expected);
  });

  // This test checks initClasses() for items.
  it('Should contain exactly one active item.', function () {
    expect($(root + ' li.accordion-active').length).toBe(1);
  });
});
