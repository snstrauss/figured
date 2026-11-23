// jsdom does not implement the native dialog methods. This only models open/close;
// browser focus and modal behavior remain manual checks.
HTMLDialogElement.prototype.showModal = function () {
  this.open = true;
};
HTMLDialogElement.prototype.close = function () {
  this.open = false;
  this.dispatchEvent(new Event("close"));
};
