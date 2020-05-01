# accordion

A tiny VanillaJS Accordion library. 

Should work on all current 2020 browsers.


## Usage

- Prepare your markup as a plain HTML Definition List with class `accordion`.
- Link your version of `accordion.css` to it, adjusting as needed.
- Load `domready.js` and `accordion.js` in your page, or use your own `DOMready`
  library
- Instantiate the accordion as:

```ecmascript 6
domReady(() => {
  const el = new WofAccordion(window);
  if (!el.isValid) {
    return;
  }
  window.wofAccordion = el; // Optional: convenient for debug.
});
```

Only a single Accordion will work on any given page.


## Markup

Accordion uses a smaller set of classes than its previous versions.

The expected structure is a plain HTML Definition List with class `accordion`:

    <dl class="accordion">
      <dt>pane header</dt>
      <dd><a href="#">pane item</a></dd>
      <dd class="active">pane item</dd>
      
      <dt>...
      <dd>...
    </dl>
  
At most one item may have the `accordion-active` class at the same time, and
should not contain a link, as it represents the current page.


## Changes

- New version uses vanilla JS, no longer depending on jQuery.
- New version is 4 times smaller the the jQuery version, not even counting jQuery
  itself.
