const mongoose = require('mongoose')
const Router = require('koa-router')
const router = new Router()
const {
    controller,
    get,
    post,
    put
} = require('../lib/decorator')
const {
    getAllMovies,
    getMovieDetail,
    getRelativeMovies
} = require('../service/movie')

@controller('/api/v0/movies')
export class movieController {
    @get('/')
    async getMovies(ctx, next) {
        const {
            type,
            year
        } = ctx.query
        const movies = await getAllMovies(type, year)
        ctx.body = {
            movies
        }
    }
    @get('/:id')
    async getMovieDetail(ctx, next) {
        const id = ctx.params.id
        const movie = await getMovieDetail(id)
        const relativeMovies = await getRelativeMovies(movie)
        ctx.body = {
            data: {
                movie,
                relativeMovies
            },
            success: true
        }
    }
}

// router.get('/movies', async (ctx, next) => {
//     const Movie = mongoose.model('Movie')
//     const movies = await Movie.find({}).sort({
//         'meta.createdAt': -1
//     })
//     ctx.body = {
//         movies
//     }
// })
// router.get('/movies/:id', async (ctx, next) => {
//     const Movie = mongoose.model('Movie')
//     const id = ctx.params.id
//     const movies = await Movie.findOne({_id: id})
//     ctx.body = {
//         movies
//     }
// })
// module.exports = router