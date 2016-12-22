import webpackDevMiddleware from 'webpack-dev-middleware'
import debug from 'debug'
const log = debug('webpack-dev')

const stats = {
    chunkModules: false,
    colors: 'debug' != process.env.NODE_ENV
}

export default function middleware(compiler, options = {}) {
    const {
        publicPath
    } = compiler.options.output
    const defaults = options.publicPath ? options : {
        publicPath,
        stats
    }
    const middleware = webpackDevMiddleware(compiler, Object.assign({}, defaults, options))

    function waitMiddleware(context){
        return (cb) =>{
            middleware.waitUntilValid(()=> cb(null, true))
            compiler.plugin('failed', (err)=> cb(err))
        }
    }

    function applyMiddleware(context) {
        return (cb) => {
            try {
                log('enter')
                middleware(context.req, {
                    end: (content) => {
                        context.body = content
                        cb(null, true)
                    },
                    setHeader:(name,value) => context.headers[name] = value
                }, ()=> cb(null, false))
            } catch (error) {
                cb(error)
            }
        }
    }

    return function* (next) {
        yield waitMiddleware(this)
        let handled = yield applyMiddleware(this)
        log(handled ? 'handled' : 'skip')
        if(!handled){
            yield next
        }
    }
}