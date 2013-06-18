/**
 * @file
 * A simple accordion script.
 *
 * See expected HTML layout in accompanying CSS file.
 *
 * (c) 2013 Ouest Systèmes Informatiques SARL.
 *
 * Licensed under the General Public License version 2 and later.
 */

/* jshint bitwise:true, browser:true, curly:true, eqeqeq:true, expr:true, forin:true, latedef: true, newcap: true, noarg:true, noempty:true, strict:true, trailing: true, undef:true, unused:true */

var accordion = {};

/**
 * Retrieve panes associated with a header.
 *
 * @param header
 *   A jQuery object targeting a single accordion header.
 *
 * @return
 *   A jQuery object list targeting the panes associated to the header.
 */
accordion.headerGetPanes = function (header) {
  "use strict";
  var ret;

  if (!header.hasClass('accordion-header')) {
    throw "Accordion: headerGetPanes() parameter is not an Accordion header.";
  }
  ret = header.nextUntil('.accordion-header');
  return ret;
};

/**
 * Does any of the panes below the header contain the active item ?
 *
 * @param header
 *
 * @return boolean
 */
accordion.headerIsActive = function (header) {
  "use strict";
  var ret = this.headerGetPanes(header).hasClass('.accordion-pane-closed');
  return ret;
};

/**
 * Open the header for the chosen the item.
 *
 * @param item
 *   The jQuery wrappper for one or more items. If several are passed, only the
 *   first will be considered.
 *
 * @return
 *   The jQuery wrapper for the modified header.
 */
accordion.headerOpen = function (item) {
  "use strict";
  var header;
  var panes;
  var ret;

  // Ignore any item beyond the first.
  item = item.first();
  header = this.itemGetHeader(item);
  panes = this.headerGetPanes(header);
  ret = this.paneOpen(panes);
  return ret;
};

/**
 * Retrieve the header for the chosen item.
 *
 * @param item
 *
 * @return jQuery
 */
accordion.itemGetHeader = function (item) {
  "use strict";
  var ret;

  ret = item.parent().prev('.accordion-header');
  return ret;
};

/**
 * Mark an accordion item as active and remove active status from all others.
 *
 * @param item
 *   jQuery wrapper for the item on which to set active status.
 *
 * @return jQuery
 *   The same item wrapper.
 */
accordion.itemSetActive = function (item) {
  "use strict";
  item.closest('.accordion').
    find('.accordion-active').
    removeClass('accordion-active');
  item.addClass('accordion-active');
  return item;
};

/**
 * Initialize Accordion.
 *
 * @param $
 *   jQuery
 */
accordion.init = function ($) {
  "use strict";
  this.$ = $;
  this.initClasses();
  this.initHandlers();
  this.initState();
};

/**
 * Add accordion class to each header, list and list item.
 *
 * @return void
 */
accordion.initClasses = function () {
  "use strict";
  this.$('.accordion>h2').addClass('accordion-header');
  this.$('.accordion ul').addClass('accordion-pane');
  this.$('.accordion-pane>li').addClass('accordion-item');
};

/**
 * Add click handler to each header and list item.
 *
 * @return void
 */
accordion.initHandlers = function () {
  "use strict";
  this.$('.accordion-header').click(function (event) {
    accordion.onHeaderClick(event);
  });
};

/**
 * Establish the initial active header and item.
 *
 * - If there is no initial active item, activate the first one.
 * - If there are several active items, deactivate all but the first one.
 * - If there exactly one active item, do not modify it.
 * - In all cases make sure only the header for the active item is active too.
 *
 * @return The jQuery wrapper for the header of the active pane.
 */
accordion.initState = function () {
  "use strict";
  var active_selector = '.accordion-item.accordion-active';
  var initial_active_items = this.$(active_selector);
  var active_item;
  var ret;

  switch (initial_active_items.length) {
    case 0:
      // No active item, activate the first item.
      this.$('.accordion-item').first().addClass('accordion-active');
      break;

    case 1:
      // Normal situation, don't touch it.
      break;

    default:
      // Multiple active items, remove all but the first.
      initial_active_items.slice(1).removeClass('accordion-active');
      break;
  }

  active_item = this.$(active_selector);
  this.paneCloseAll();
  ret = this.headerOpen(active_item);
  return ret;
};

/**
 * Click handler for headers.
 *
 * Mark the first item in the associated pane as active and all others as
 * inactive.
 *
 * @param event
 *   The jQuery Event object
 *
 * @return void
 */
accordion.onHeaderClick = function (event) {
  "use strict";
  var header;

  header = this.$(event.target);
  if (!this.headerIsActive(header)) {
    this.paneCloseAll();
    this.headerGetPanes(header).removeClass('accordion-pane-closed');
  }
};

/**
 * Close all panes in the passed jQuery list.
 *
 * @param panes
 *
 * @return
 *   The jQuery wrapper for the closed panes.
 */
accordion.paneClose = function(panes) {
  "use strict";
  var ret = panes.addClass('accordion-pane-closed');
  return ret;
};

/**
 * Close all panes in the Accordion.
 *
 * @return
 *   The jQuery wrapper for the closed panes.
 */
accordion.paneCloseAll = function () {
  "use strict";
  var panes;
  var ret;

  panes = this.$('.accordion-header').
    nextUntil('.accordion-header');
  ret = this.paneClose(panes);
  return ret;
};

/**
 * Open all panes in the passed jQuery list.
 *
 * @param panes
 *
 * @return
 *   The jQuery wrapper for the opened panes.
 */
accordion.paneOpen = function (panes) {
  "use strict";
  var ret = panes.removeClass('accordion-pane-closed');
  return ret;
};

/**
 * Open all panes in the Accordion.
 *
 * This function is only a development helper: in normal operation, exactly one
 * pane is opened at any time.
 *
 * @return The jQuery wrapper for the opened panes.
 */
accordion.paneOpenAll = function() {
  "use strict";
  var panes;
  var ret;

  panes = this.$('.accordion-header').
    nextUntil('.accordion-header');
  ret = this.paneOpen(panes);
  return ret;
};

/**
 * Setup Accordion on document ready, checking for a browser and jQuery.
 */
if (typeof jQuery === 'undefined') {
  throw "Accordion depends on jQuery.";
}

(function ($) {
  "use strict";
  if (typeof document === 'undefined') {
    throw "Accordion is for browsers";
  }
  $(document).ready(function () {
    accordion.init($);
  });
})(jQuery);
