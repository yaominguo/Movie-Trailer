// http://api.douban.com/v2/movie/subject/1764796

//发起服务器端对豆瓣api的请求
const rp = require('request-promise-native')

async function fetchMovie(item){
    const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}`
    const res = await rp(url)
    return res
}

!(async ()=>{
    let movies = [
        { doubanId: 26856479,
            title: '盛势',
            rate: 0,
            poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2495669053.jpg' },
        { doubanId: 27002131,
            title: '连带伤害',
            rate: 8.2,
            poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2514153951.jpg' }
    ]
    movies.map(async movie=>{
        let movieData = await fetchMovie(movie)
        try{
            movieData = JSON.parse(movieData)
            console.log(movieData.genres)
            console.log(movieData.summary)
        }catch(err){
            console.log(err)
        }
    })
})()