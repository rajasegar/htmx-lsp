"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const htmlAttributes = [
    // Core attributes
    {
        name: 'hx-boost',
        documentation: 'add or remove progressive enhancement for links and forms'
    },
    { name: 'hx-get', documentation: 'issues a GET request to the specified url' },
    { name: 'hx-post', documentation: 'issues a POST request to the specified url' },
    { name: 'hx-on', documentation: 'handle any event with a script inline' },
    { name: 'hx-push-url', documentation: 'pushes the URL into the browser location bar, creating a new history entry' },
    { name: 'hx-select', documentation: 'select content to swap in from a response' },
    { name: 'hx-select-oob', documentation: 'select content to swap in from a response, out of band (somewhere other than the target)' },
    { name: 'hx-swap', documentation: 'controls how content is swapped in (outerHTML, beforeend, afterend, ...)' },
    { name: 'hx-swap-oob', documentation: 'marks content in a response to be out of band (should swap in somewhere othern than the target)' },
    { name: 'hx-target', documentation: 'specifies the target element to be swapped' },
    { name: 'hx-trigger', documentation: 'specifies the event that triggers the request' },
    { name: 'hx-vals', documentation: 'adds values to the parameters to submit with the request (JSON-formatted)' },
    // Additional attributes 
    { name: 'hx-confirm', documentation: 'shows a `confirm()` dialog before issuing a request' },
];
exports.default = htmlAttributes;
//# sourceMappingURL=attributes.js.map