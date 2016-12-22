'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hotMiddleware = exports.devMiddleware = undefined;

var _devMiddleware = require('./devMiddleware');

Object.defineProperty(exports, 'devMiddleware', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_devMiddleware).default;
    }
});

var _hotMiddleware = require('./hotMiddleware');

Object.defineProperty(exports, 'hotMiddleware', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_hotMiddleware).default;
    }
});

require('babel-polyfill');

var _devMiddleware2 = _interopRequireDefault(_devMiddleware);

var _hotMiddleware2 = _interopRequireDefault(_hotMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    devMiddleware: _devMiddleware2.default,
    hotMiddleware: _hotMiddleware2.default
};
//# sourceMappingURL=index.js.map