const puppeteer = require('puppeteer')
const fs = require('fs')
async function start(urls) {
    const browser = await puppeteer.launch({
        headless: true,
    })
    for (let i = 0; i < urls.length; i++) {
        const chapter_url = urls[i]
        const page = await browser.newPage()
        page.setViewport({width:1920, height:1080})
        let chapterName = chapter_url.split('/').pop()
        await fs.promises
            .mkdir(chapterName, { recursive: true })
            .catch(console.error)  
        page.on('response', async (response) => {
            const matches =
                /.*s.*\.mkklcdn.*temp.*\.com.*\.(jpg|png|svg|gif)$/.exec(
                    response.url()
                )
            if (matches && matches.length === 2) {
                console.log(matches)
                var url = matches[0].split('/')
                const fileName = url.pop()
                const buffer = await response.buffer()
                console.log('path is: '+ './' + chapterName + '/' + fileName)
                fs.writeFileSync(
                    './' + chapterName + '/' + fileName,
                    buffer,
                    'base64'
                )
            }
        })
        await page.goto(chapter_url)
        await page.waitFor(10000);
    }
    browser.close()
}


module.exports = start
