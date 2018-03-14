// trailer-list.js 子进程
const cp = require('child_process')
const { resolve } = require('path')
const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')

!(async ()=>{
    const script = resolve(__dirname, '../crawler/trailer-list.js')
    const child = cp.fork(script, []) //派生出一个子进程
    let invoked = false

    child.on('error', err=>{
        if(invoked) return
        invoked = true
        console.log(err)
    })
    child.on('exit', code=>{
        if (invoked) return  
        invoked = true
        
        let err = code === 0 ? null : new Error('exit code ' + code)
        console.log(err)
    })

    child.on('message', data=>{
        let result = data.result
        result.forEach(async item => {
            let movie = await Movie.findOne({
                doubanId:item.doubanId
            })
            // 如果数据库中没有存储过
            if(!movie){
                movie = new Movie(item)
                await movie.save()
            }
        })
    })
})()