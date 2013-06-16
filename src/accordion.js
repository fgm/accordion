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

/* jshint bitwise:true, browser:true, curly:true, eqeqeq:true, expr:true, forin:true, latedef: true, newcap: true, noarg:true, noempty:true, strict:true, trailing: true, undef:true, unused:true, jquery:true */

/* Only define exports for CommonJS-inspired environments, like Node. Browsers
 * load all script globals anyway.
 */
var isCommonJS = (typeof window == 'undefined') && (typeof exports == 'object');
var accordion = {};
if (isCommonJS) {
  exports.accordion = accordion;
}

/**
 * Mark an accordion item as active and remove mark from all other items.
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
};

/**
 * Make the first item for a given the one and only active item.
 *
 * @param header
 *
 * @return The jQuery wrapper for the now active item.
 */
accordion.headerSetFirstItemActive = function (header) {
  "use strict";
  var active_item;

  active_item = header.
    next().
    find('.accordion-item').
    first();
  this.itemSetActive(active_item);

  return active_item;
};

/**
 * Close all panes in the Accordion.
 *
 * @return The jQuery wrapper for the closed panes.
 */
accordion.paneCloseAll = function () {
  "use strict";
  var ret = this.$('.accordion-header').
    nextUntil('.accordion-header').
    addClass('accordion-pane-closed');

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
  var ret = this.$('.accordion-header').
    nextUntil('.accordion-header').
    removeClass('accordion-pane-closed');

  return ret;
};

/**
 * Synchronize the pane state with the active classes.
 *
 * - Close all panes
 * - Reopen the pane containing the active item.
 */
accordion.paneSynchronize = function () {
  "use strict";
  this.paneCloseAll();
  this.$('.accordion-item.accordion-active').
    parentsUntil('.accordion').
    removeClass('accordion-pane-closed');
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
accordion.headerClick = function (event) {
  "use strict";
  var header;

  header = this.$(event.target);
  if (!header.hasClass('accordion-active')) {
    accordion.headerSetFirstItemActive(header);
    accordion.paneSynchronize($);
  }
};

/**
 * Set the header active state based on the item active state.
 *
 * @param item
 *   The jQuery wrappper for one or more items. If several are passed, only the
 *   first will be considered.
 *
 * @return
 *   The jQuery wrapper for the modified header.
 */
accordion.itemSetHeaderActive = function (item) {
  "use strict";
  var active_class = 'accordion-active';
  var parent;

  item = item.first();
  parent = item.
    parent().
    prevAll('.accordion-header').
    first();

  if (item.hasClass(active_class)) {
    parent.addClass(active_class);
  }
  else {
    parent.removeClass(active_class);
  }

  return parent;
}

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
 * @param $
 *   jQuery
 *
 * @return void
 */
accordion.initHandlers = function () {
  "use strict";
  this.$('.accordion-header').click(function (event) {
    accordion.headerClick(event);
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
  var active_items = this.$('.accordion-item.accordion-active');

  switch (active_items.length) {
    case 0:
      // No active item, activate the first item.
      this.$('.accordion-item').
        first().
        addClass('accordion-active');
      break;

    case 1:
      // Normal situation, don't touch it.
      break;

    default:
      // Multiple active items, remove all but the first.
      active_items.slice(1).
        removeClass('accordion-active');
      break;
  }

  var ret = this.itemSetHeaderActive(this.$('.accordion-item.accordion-active'));
  this.paneSynchronize();
  return ret;
};

/**
 * Initialize Accordion.
 */
accordion.init = function ($) {
  "use strict";
  this.$ = $;
  this.initClasses();
  this.initHandlers();
  this.initState();
};

/**
 * Setup Accordion on document ready.
 */
if (typeof document == 'undefined') {
  document = { };
}

if (typeof jQuery == 'undefined') {
  var jQuery = function (document_arg) {
    var fake = function () { return this; };
    var fakeNames = [
      'addClass', 'removeClass', 'hasClass',
      'first', 'parent', 'parentsUntil', 'prevAll', 'nextUntil',
      'click',
      'slice'
    ];

    for (name in fakeNames) {
      jQuery.prototype[fakeNames[name]] = fake;
    }

    // Can't just fake ready().
    jQuery.prototype.ready = function ready(onReady) {
      if (typeof onReady != 'undefined') {
        onReady();
      }
      return this;
    };

    return jQuery.prototype;
  };
}

if (typeof jQuery != 'undefined') {
  (function ($) {
    "use strict";
    $(document).ready(function () {
      accordion.init($);
    });
  })(jQuery);
}
