# koa-webpack-middleware

webpack dev/hot middleware for koa v1 and webpack v1

## dependencies

```sh
webpack
webpack-dev-middleware
webpack-hot-middleware
debug
babel-polyfill
```

## install

```sh
npm install https://github.com/Joylei/koa-webpack-middleware.git
```

## usage

```js
import webpack from 'webpack'
import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware'
import webpackConfig from './YOUR_WEBPACK_CONFIG'

const app = koa()
const compiler = webpack(webpackConfig)
app.use(devMiddleware(compiler, {
    noInfo: false,
    quiet: false,
    lazy: false, //true means no watching, but recompilation on every request
    watchOptions:{
        aggregateTimeout: 300,
        pool: true
    },
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true, chunks: false }
}))
app.use(hotMiddleware(compiler))

app.listen(3000)
```

## thanks

[koa-webpack-middleware](https://github.com/leecade/koa-webpack-middleware) for koa v2