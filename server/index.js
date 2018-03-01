const Koa = require('koa')
const app = new Koa()
const {
    htmlTpl,
    pugTpl
} = require('./template/index')
const pug = require('pug')

app.use(async (ctx, next) => {
    ctx.type = 'text/html; charset=utf-8'
    ctx.body = pug.render(pugTpl,{
        you:'Yali!',
        me:'Guo!'
    })
})

app.listen(2333)