const mongoose = require('mongoose')
const db = 'mongodb://localhost/Movie-Trailer-test'
const { resolve } = require('path')
const glob = require('glob') //node的模块，可以用*等规则来匹配文件等
mongoose.Promise = global.Promise

exports.initSchemas = () =>{
    // 同步加载所有schema下面的文件
    glob.sync(resolve(__dirname, './schema','**/*.js')).forEach(require)
}
exports.initAdmin = async() => {
    const User = mongoose.model('User')
    let user = await User.findOne({
        username: 'Guo'
    })
    if(!user){
        const user = new User({
            username: 'Guo',
            email:'missgmy@yahoo.com',
            password:'123456',
            role:'admin'
        })
        await user.save()
    }
}
exports.connect = () => {
    let maxConnectTimes = 0
    return new Promise((resolve, reject) => {
        if (process.env.NODE_ENV !== 'production') {
            mongoose.set('debug', true)
        }
        mongoose.connect(db)
        mongoose.connection.on('disconnected', () => {
            if (maxConnectTimes < 5) {
                mongoose.connect(db)
            } else {
                throw new Error('数据库连接超时咯！')
            }
            maxConnectTimes += 1
        })
        mongoose.connection.on('error', () => {
            if (maxConnectTimes < 5) {
                mongoose.connect(db)
            } else {
                throw new Error('数据库连接超时咯！')
            }
            maxConnectTimes += 1
        })
        mongoose.connection.once('open', () => {
            // const Dog = mongoose.model('Dog', {name:String})
            // const dog = new Dog({name: '阿尔法'})
            // dog.save().then(()=>{
            //     console.log('Test OK!')
            // })
            resolve()
            console.log('MongoDB Connected successfull!')
        })
    })
}