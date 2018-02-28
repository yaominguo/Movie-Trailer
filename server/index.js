const Koa = require('koa')
const app = new Koa()
const {
    model
} = require('./template/index')

app.use(async (ctx, next) => {
    ctx.type = 'text/html; charset=utf-8'
    ctx.body = model
})

app.listen(2333)