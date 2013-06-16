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

## Running tests

Tests are written for Jasmine 1.3.1 and demonstrate both the expected structure
and use of the Accordion methods.

- Download Jasmine somewhere like `lib/jasmine-1.3.1/jasmine*`
- Symlink lib/Jasmine to the Jasmine directory, like
   `ln -s lib/jasmine-1.3.1 lib/Jasmine`
- Download jQuery somewhere, somewhere like `lib/jQuery/jquery.1.10.1.js` 
- Symlink lib/jQuery to the jQuery file, like 
    `ln -s lib/jQuery/jquery.1.10.1.js lib/jQuery.js`
- Browse to `SpecRunner.html`
- Jasmine results should display. If they don't check for errors in your browser
  console log.

