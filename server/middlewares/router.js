const {
    Route
} = require('../lib/decorator')
const {
    resolve
} = require('path')

export const router = app => {
    const apiPath = resolve(__dirname, '../route')
    const router = new Route(app, apiPath)

    router.init()
}