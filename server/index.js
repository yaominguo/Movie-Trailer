
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const mongoose = require('mongoose')
const {
    resolve
} = require('path')
const {
    connect,
    initSchemas
} = require('./database/init')

!(async () => {
    await connect()
    initSchemas()
    // require('./tasks/movie')
    require('./tasks/api')
})()

// 整合模板引擎当中间件使用
app.use(views(resolve(__dirname, './views'), {
    extension: 'pug'
}))

app.use(async (ctx, next) => {
    await ctx.render('index', {
        you: 'Yali',
        me: 'Guo!'
    })
})

// app.use(async (ctx, next) => {
//     ctx.type = 'text/html; charset=utf-8'
//     ctx.body = pug.render(pugTpl,{
//         you:'Yali!',
//         me:'Guo!'
//     })
// })

app.listen(2333)