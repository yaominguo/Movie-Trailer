// 爬取预告片和封面图等

const puppeteer = require('puppeteer')
const base = `https://movie.douban.com/subject/`
const doubanId = '26739551'
const videoBase = `https://movie.douban.com/trailer/219491/`
const sleep = time => new Promise(resolve => {
    setTimeout(resolve, time)
})
!(async () => {
    console.log('Start visit the target page')

    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        dumpio: false
    })

    const page = await browser.newPage()
    await page.goto(base + doubanId, {
        waitUntil: 'networkidle2'
    })

    await sleep(1000)

    const result = await page.evaluate(() => {
        var $ = window.$
        var it = $('.related-pic-video')
        if(it && it.length>0){
            var link = it.attr('href')
            var cover = it.find('img').attr('src')
            return{
                link,
                cover
            }
        }
        return {}
    })
    let videoSrc 
    if(result.link){
        await page.goto(result.link, {
            waitUntil:'networkidle2'
        })
        await sleep(2000)
        videoSrc = await page.evaluate(()=>{
           var $ = window.$ 
           var it = $('source')

           if(it && it.length>0){
               return it.attr('src')
           }
           return ''
        })
    }
    const data = {
        videoSrc,
        doubanId,
        cover: result.cover
    }
    browser.close()
    // console.log(result)
    // console.log('Mission Complete!')

    process.send(data) //发送结果
    process.exit(0)
})()