const key = 'setPrototypeOf';
if (typeof Object[key] === 'undefined') {
  Object[key] = require('babel-runtime/helpers/defaults.js').default;
}
