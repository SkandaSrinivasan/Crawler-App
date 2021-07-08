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
        //Create directory with chapter number
        await fs.promises
            .mkdir(chapterName, { recursive: true })
            .catch(console.error)  
        console.log("\x1b[35m", `${chapterName} is being downloaded`)
        //looks at all urls in the response
        page.on('response', async (response) => {
            //regex to match the chapter images
            const matches =
                /.*s.*\.mkklcdn.*temp.*\.com.*chapter.*\.(jpg|png|svg|gif)$/.exec(
                    response.url()
                )
            if (matches && matches.length === 2) {
                var url = matches[0].split('/')
                const fileName = url.pop()
                const buffer = await response.buffer()
                //writing the chapter images to disk
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
    //Closing up shop
    browser.close()
}


module.exports = start
