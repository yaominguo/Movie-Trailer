const Koa = require('koa')
const views = require('koa-views')
const mongoose = require('mongoose')
const {
    resolve
} = require('path')
const {
    connect,
    initSchemas
} = require('./database/init')
const R = require('ramda')
const MIDDLEWARES = ['router', 'parcel']

const userMiddlewares = (app) => {
    R.map(
        R.compose(
            R.forEachObjIndexed(
                initWith => initWith(app)
            ),
            require,
            name => resolve(__dirname, `./middlewares/${name}`)
        )
    )(MIDDLEWARES)
}

!(async () => {
    await connect()
    initSchemas()
    // require('./tasks/movie')
    require('./tasks/api')

    const app = new Koa()
    await userMiddlewares(app)
    app.listen(2333)
    console.log('Service Start At: http://localhost:2333/')
})()


// 在decorator.js文件中写了，故这里不用了
// app.use(router.routes()).use(router.allowedMethods())

// // 整合模板引擎当中间件使用
// app.use(views(resolve(__dirname, './views'), {
//     extension: 'pug'
// }))

// app.use(async (ctx, next) => {
//     await ctx.render('index', {
//         you: 'Yali',
//         me: 'Guo!'
//     })
// })

// app.use(async (ctx, next) => {
//     ctx.type = 'text/html; charset=utf-8'
//     ctx.body = pug.render(pugTpl,{
//         you:'Yali!',
//         me:'Guo!'
//     })
// })
