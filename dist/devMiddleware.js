'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = middleware;

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = (0, _debug2.default)('webpack-dev');

var stats = {
    chunkModules: false,
    colors: 'debug' != process.env.NODE_ENV
};

function middleware(compiler) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var publicPath = compiler.options.output.publicPath;

    var defaults = options.publicPath ? options : {
        publicPath: publicPath,
        stats: stats
    };
    var middleware = (0, _webpackDevMiddleware2.default)(compiler, Object.assign({}, defaults, options));

    function waitMiddleware(context) {
        return function (cb) {
            middleware.waitUntilValid(function () {
                return cb(null, true);
            });
            compiler.plugin('failed', function (err) {
                return cb(err);
            });
        };
    }

    function applyMiddleware(context) {
        return function (cb) {
            try {
                log('enter');
                middleware(context.req, {
                    end: function end(content) {
                        context.body = content;
                        cb(null, true);
                    },
                    setHeader: function setHeader(name, value) {
                        return context.headers[name] = value;
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
                        return waitMiddleware(this);

                    case 2:
                        _context.next = 4;
                        return applyMiddleware(this);

                    case 4:
                        handled = _context.sent;

                        log(handled ? 'handled' : 'skip');

                        if (handled) {
                            _context.next = 9;
                            break;
                        }

                        _context.next = 9;
                        return next;

                    case 9:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    });
}
//# sourceMappingURL=devMiddleware.js.map