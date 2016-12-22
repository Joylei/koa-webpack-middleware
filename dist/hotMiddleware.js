'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = middleware;

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _stream = require('stream');

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = (0, _debug2.default)('webpack-hot');

function middleware(compiler) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var middleware = (0, _webpackHotMiddleware2.default)(compiler, Object.assign({}, options));

    function applyMiddleware(context) {
        return function (cb) {
            log('enter');
            context.req.on('close', function () {
                log('disconnected');
                cb(null, false);
            });
            try {
                var stream = new _stream.PassThrough();
                context.body = stream;
                middleware(context.req, {
                    write: stream.write.bind(stream),
                    writeHead: function writeHead(state, headers) {
                        context.state = state;
                        context.set(headers);
                    }
                }, function () {
                    return cb(null, false);
                });
            } catch (error) {
                cb(error);
            }
        };
    }

    return regeneratorRuntime.mark(function _callee(next) {
        var handled;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return applyMiddleware(this);

                    case 2:
                        handled = _context.sent;

                        log(handled ? 'handled' : 'skip');

                        if (handled) {
                            _context.next = 7;
                            break;
                        }

                        _context.next = 7;
                        return next;

                    case 7:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    });
}
//# sourceMappingURL=hotMiddleware.js.map