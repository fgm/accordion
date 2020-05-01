/* Include domready.js before this file */

/**
 *
 * @param {Window} context
 * @returns {WofAccordion}
 * @constructor
 */
const WofAccordion = function (context) {
  this.isValid = false;

  this.root = context.document.querySelector('.accordion');
  if (this.root === null) {
    console.debug('Accordion not found on page. Not initializing.');
    return this;
  }

  this.terms = this.root.querySelectorAll('dt');
  if (this.terms.length <= 1) {
    console.error('Accordion does not have at least two terms. Aborting.');
    return this;
  }
  this.isValid = true;

  /**
   * The definitions grouped by term.
   *
   * @type {Map<any, any>}
   */
  this.defsByTerm = new Map();

  /**
   * The currently open term section.
   *
   * @type {HTMLElement}
   */
  this.currentTerm = this.buildDefsByTerm();

  this.open(this.currentTerm);
  return this;
};

/**
 * Build the definitions by term map, arming click handlers on terms.
 *
 * @return {HTMLElement}
 */
WofAccordion.prototype.buildDefsByTerm = function () {
  // We know the first item will be a DT, starting the loop correctly.
  let term = null;
  let defs = [];
  const items = this.root.querySelectorAll('dd, dt');
  let activeTerm = null;
  for (const item of items) {
    const name = item.tagName;
    if (name === 'DT') {
      term = item;
      term.addEventListener('click', this.onTermClick.bind(this));
      defs = [];
      this.defsByTerm.set(term, defs);
    } else if (name === 'DD') {
      defs.push(item);
      if (item.classList.contains('active')) {
        activeTerm = term;
      }
    } else {
      console.error(`Incorrect element in definition list: ${name}.`);
    }
  }
  return activeTerm;
};

/**
 * Click handler for terms: open its section if needed.
 *
 * @param {MouseEvent} event
 */
WofAccordion.prototype.onTermClick = function (event) {
  /**
   * Not just an EventTarget: due to the binding, it is a DT HTMLElement.
   *
   * @type {EventTarget}
   */
  const term = event.target;
  if (term != this.currentTerm) {
    this.open(term);
  }
};

/**
 * Open a section and close the other ones.
 *
 * This will reset the accordion even if it was already correct.
 *
 * @param {EventTarget} currentTerm
 */
WofAccordion.prototype.open = function (currentTerm) {
  const OPEN_CLASS = 'open';

  this.currentTerm = currentTerm;
  this.defsByTerm.forEach((defs, term) => {
    const isCurrent = term === currentTerm;
    for (const def of defs) {
      if (isCurrent) {
        def.classList.add(OPEN_CLASS);
      } else {
        def.classList.remove(OPEN_CLASS);
      }
    }
  });
};

