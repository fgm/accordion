/**
 * Calls callback when document achieves ready state.
 *
 * @param {function} callback
 *   The function to be called on document ready.
 */
const domReady = (callback) => {
  if (document.readyState !== 'loading') {
    callback();
  } else {
    const LOADED = 'DOMContentLoaded';
    const listener = () => {
      callback();
      document.removeEventListener(LOADED, listener);
    };
    document.addEventListener(LOADED, listener);
  }
};
