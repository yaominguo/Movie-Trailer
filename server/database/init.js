const mongoose = require('mongoose')
const db = 'mongodb://localhost/Movie-Trailer-test'
mongoose.Promise = global.Promise

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