const puppeteer = require('puppeteer')
const urls = []

async function getChapters(url) {
    const browser = await puppeteer.launch({
        headless: true,
    })
    const page = await browser.newPage()
    await page.goto(url)
    let urls = await page.evaluate(() => {
        urlNodes = Array.from(document.querySelectorAll('.chapter-list > .row > span > a'))
        return urlNodes.map((node) => node.getAttribute('href'))
    })
    browser.close()
    return urls
}

// getChapters('https://mangakakalot.com/read-jb6ui158504923837')

module.exports = getChapters