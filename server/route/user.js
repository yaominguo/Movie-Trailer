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
    checkPassword
} = require('../service/movie')

@controller('/api/v0/user')
export class userController {
    @post('/')
    async login(ctx, next) {
        const {
            email,
            password
        } = ctx.request.body
        const matchData = await this.chechPassword(email, password)
        if (!matchData.user) {
            return (ctx.body = {
                success: false,
                err: '用户不存在'
            })
        }
        if (matchData.match) {
            return (ctx.body = {
                success: true
            })
        }
        return (ctx.body = {
            success: false,
            err: '密码不正确'
        })
    }
}
