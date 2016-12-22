import webpackHotMiddleware from 'webpack-hot-middleware'
import { PassThrough } from 'stream'
import debug from 'debug'
const log = debug('webpack-hot')

export default function middleware(compiler, options = {}) {
    const middleware = webpackHotMiddleware(compiler, Object.assign({},options))

    function applyMiddleware(context) {
        return (cb) => {
            log('enter')
            context.req.on('close', ()=>{
                log('disconnected')
                cb(null, false)
            })
            try {
                const stream = new PassThrough()
                context.body = stream
                middleware(context.req, {
                    write: stream.write.bind(stream),
                    writeHead: (state, headers) =>{
                        context.status = state
                        context.set(headers)
                        cb(null, true)
                    }
                }, ()=>cb(null, false))
            } catch (error) {
                cb(error)
            }
        }
    }

    return function* (next) {
        let handled = yield applyMiddleware(this)
        log(handled ? 'handled' : 'skip')
        if(!handled){
            yield next
        }
    }
}