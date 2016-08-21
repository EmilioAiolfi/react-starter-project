// https://github.com/facebook/jest/blob/master/docs/TutorialWebpack.md
// Return a Proxy to emulate css modules (if you are using them)

var idObj = require('identity-obj-proxy');
module.exports = idObj;
