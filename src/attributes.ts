
const htmlAttributes: { name: string; documentation: string }[] = [
  // Core attributes
  { 
    name: 'hx-boost', 
    documentation: 'add or remove `progressive enhancement` for links and forms' 
  },
  { name: 'hx-get', documentation: 'issues a `GET` request to the specified url' },
  { name: 'hx-post', documentation: 'issues a `POST` request to the specified url' },
  { name: 'hx-on', documentation: 'handle any event with a script inline' },
  { name: 'hx-push-url', documentation: 'pushes the URL into the browser location bar, creating a new history entry' },
  { name: 'hx-select', documentation: 'select content to swap in from a response' },
  { name: 'hx-select-oob', documentation: 'select content to swap in from a response, out of band (somewhere other than the target)' },
  { name: 'hx-swap', documentation: 'controls how content is swapped in (`outerHTML`, `beforeend`, `afterend`, ...)' },
  { name: 'hx-swap-oob', documentation: 'marks content in a response to be out of band (should swap in somewhere othern than the target)' },
  { name: 'hx-target', documentation: 'specifies the target element to be swapped' },
  { name: 'hx-trigger', documentation: 'specifies the event that triggers the request' },
  { name: 'hx-vals', documentation: 'adds values to the parameters to submit with the request (JSON-formatted)' },
  // Additional attributes 
  { name: 'hx-confirm', documentation: 'shows a `confirm()` dialog before issuing a request' },
  { name: 'hx-delete', documentation: 'issues a `DELETE` request to the specified URL' },
  { name: 'hx-disable', documentation: 'disables htmx processing for the given node and any children nodes' },
  { name: 'hx-disinherit', documentation: 'control and disable automatic attribute inheritance for child nodes' },
  { name: 'hx-encoding', documentation: 'changes the request encoding type' },
  { name: 'hx-ext', documentation: 'extensions to use for this element' },
  { name: 'hx-headers', documentation: 'adds to the headers that will be submitted with the request' },
  { name: 'hx-history', documentation: 'prevents sensitive data being saved to the history cache' },
  { name: 'hx-history-elt', documentation: 'the element to snapshot and restore during history navigation' },
  { name: 'hx-include', documentation: 'include additional data in requests' },
  { name: 'hx-indicator', documentation: 'the element to put the `htmx-request` class on during the request' },
  { name: 'hx-params', documentation: 'filters the parameters that will be submitted with a request' },
  { name: 'hx-patch', documentation: 'issues a `PATCH` request to the specified URL' },
  { name: 'hx-preserve', documentation: 'specifies elements to keep unchanged between requests' },
  { name: 'hx-prompt', documentation: 'shows a `prompt()` before submitting a request' },
  { name: 'hx-put', documentation: 'issues a `PUT` request to the specified URL' },
  { name: 'hx-replace-url', documentation: 'replace the URL in the browser location bar' },
  { name: 'hx-request', documentation: 'configures various aspects of the request' },
  { name: 'hx-sync', documentation: 'controls how requests made by different elements are synchornized' },
  { name: 'hx-validate', documentation: 'force elements to validate themselves before a request' },
  { name: 'hx-vars', documentation: 'adds values dynamically to the parameters to submit with the request (deprecated, please use `hx-vals`)' },
];

export default htmlAttributes;
