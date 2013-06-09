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

/**
 * Mark an accordion item as active and remove mark from all other items.
 * 
 * @param item
 *   jQuery wrapper for the item on which to set active status.
 *   
 * @return jQuery
 *   The same item wrapper.
 */
function accordionItemSetActive(item) {
  "use strict";
  item.closest('.accordion').find('.accordion-active').removeClass('accordion-active');
  item.addClass('accordion-active');
}

/**
 * Make the first item for a given the one and only active item.
 * 
 * @param header
 * 
 * @return The jQuery wrapper for the now active item.
 */
function accordionHeaderSetFirstItemActive(header) {
  "use strict";
  var active_item;
  
  active_item = header.next().find('.accordion-item').first();
  accordionItemSetActive(active_item);

  return active_item;
}

/**
 * Close all panes in the Accordion.
 * 
 * @param $
 *   jQuery
 *   
 * @return The jQuery wrapper for the closed panes.
 */
function accordionPaneCloseAll($) {
  "use strict";
  var ret = $('.accordion-header').
    nextUntil('.accordion-header').
    addClass('accordion-pane-closed');
  
  return ret;
}

/**
 * Open all panes in the Accordion.
 * 
 * This function is only a development helper: in normal operation, exactly one 
 * pane is opened at any time.
 * 
 * @param $
 *   jQuery
 *   
 * @return The jQuery wrapper for the opened panes.
 */

function accordionPaneOpenAll($) {
  "use strict";
  var ret = $('.accordion-header').
    nextUntil('.accordion-header').
    removeClass('accordion-pane-closed');
  
  return ret;
}

/**
 * Synchronize the pane state with the active classes.
 * 
 * - Close all panes
 * - Reopen the pane containing the active item.
 * 
 * @param $
 */
function accordionPaneSynchronize($) {
  "use strict";
  accordionPaneCloseAll($);
  $('.accordion-item.accordion-active').parent().removeClass('accordion-pane-closed');
}

/**
 * Click handler for headers.
 * 
 * Mark the first item in the associated pane as active and all others as 
 * inactive.
 * 
 * @param $
 *   jQuery
 * @param event
 *   The jQuery Event object
 *   
 * @return void
 */
function accordionHeaderClick($, event) {
  "use strict";
  var header;
  
  header = $(event.target);
  if (!header.hasClass('accordion-active')) {
    accordionHeaderSetFirstItemActive(header);
    accordionPaneSynchronize($);
  }
}

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
function accordionItemSetHeaderActive(item) {
  "use strict";
  var active_class = 'accordion-active';
  var parent;
  
  item = item.first();
  parent = item.parent().prevAll('.accordion-header').first();
  
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
 * @param $
 *   jQuery
 *   
 * @return void
 */
function accordionInitClasses($) {
  "use strict";
  $('.accordion>h2').addClass('accordion-header');
  $('.accordion>ul').addClass('accordion-pane');
  $('.accordion-pane>li').addClass('accordion-item');
}

/**
 * Add click handler to each header and list item. 
 * 
 * @param $
 *   jQuery
 *   
 * @return void
 */
function accordionInitHandlers($) {
  "use strict";
  $('.accordion-header').click(function (event) {
    accordionHeaderClick($, event);
  });
}

/**
 * Establish the initial active header and item.
 * 
 * - If there is no initial active item, activate the first one.
 * - If there are several active items, deactivate all but the first one.
 * - If there exactly one active item, do not modify it.
 * - In all cases make sure only the header for the active item is active too.
 * 
 * @param $
 *   jQuery
 *   
 * @return The jQuery wrapper for the header of the active pane.
 */
function accordionInitState($) {
  "use strict";
  var active_items = $('.accordion-item.accordion-active');
  
  switch (active_items.length) {
    case 0:
      // No active item, activate the first item.
      $('.accordion-item').first().addClass('accordion-active');
      break;
      
    case 1:
      // Normal situation, don't touch it.
      break;
      
    default:
      // Multiple active items, remove all but the first.
      active_items.slice(1).removeClass('accordion-active');
      break;
  }
  
  var ret = accordionItemSetHeaderActive($('.accordion-item.accordion-active'));
  accordionPaneSynchronize($);
  return ret;
}

/**
 * Initialize Accordion.
 */
function accordionInit($) {
  "use strict";
  accordionInitClasses($);
  accordionInitHandlers($);
  accordionInitState($);
}

/**
 * Setup Accordion on document ready 
 */
(function ($) {
  "use strict";
  $(document).ready(function () {
    accordionInit($);
  });
})(jQuery);
