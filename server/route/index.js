
const mongoose = require('mongoose')
const Router = require('koa-router')
const router = new Router()

router.get('/movies/all', async (ctx, next) => {
    const Movie = mongoose.model('Movie')
    const movies = await Movie.find({}).sort({
        'meta.createdAt': -1
    })
    ctx.body = {
        movies
    }
})
router.get('/movies/detail/:id', async (ctx, next) => {
    const Movie = mongoose.model('Movie')
    const id = ctx.params.id
    const movies = await Movie.findOne({_id: id})
    ctx.body = {
        movies
    }
})
module.exports = router