const Koa = require('koa')
const app = new Koa()

app.use(async (ctx,next) => {
    ctx.body='电影预告网站Test！'
})

app.listen(2333)