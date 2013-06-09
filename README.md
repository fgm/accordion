# accordion

A tiny jQuery Accordion library. 

Should work on 1.4 <= jQuery <= 1.10.

## Usage

- Load jQuery in your page
- Load `accordion.js` in your page
- Link to `accordion.css` in your page

In this initial version, only a single Accordion will work on any given page.
Behavior with multiple `.accordion` elements is undefined and likely broken.

## Markup

Accordion uses self-contained classes: all begin with "accordion".

The expected structure is something like:

    <whatever class='accordion'>
      <h2>pane header</h2>
      <ul>
        <li>pane item</li>
        <li class='accordion-active'>pane item</li>
        </ul>
      <h2>...
      <ul>...
      </whatever>
  
Other structures can be used, but initialy Accordion classes assignments have to
be performed manually. See `accordionInitClasses()` for an example. Once classes
are set, Accordion only relies on its classes, not on the actual element types.

At most one item may have the `accordion-active` class at the same time. Its
associated header will automatically considered active too. If no item carries
that class on the initial HTML, the first item of the first header will be set
active.

Although this is not recommended, multiple `<ul>` may be used for a given pane.
