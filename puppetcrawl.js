const puppeteer = require('puppeteer');
const fs = require('fs');

async function run() {
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 1200 });
    let counter = 0
    page.on('response', async (response) => {
        const matches = /.*s6\.mkklcdnv6tempv3\.com.*\.(jpg|png|svg|gif)$/.exec(response.url());
        if (matches && (matches.length === 2)) {
          var url = matches[0].split('/')
          const fileName = url.pop()
          const chapterName = url.pop()
          console.log(chapterName+'/'+fileName)
          const buffer = await response.buffer();
          fs.promises.mkdir(chapterName, { recursive: true }).catch(console.error);
          fs.writeFileSync(chapterName+ '/' +fileName, buffer, 'base64');
          counter += 1;
        }
      });
    await page.goto('https://readmanganato.com/manga-me955161/chapter-516');
    await page.waitFor(4000)
    browser.close();
}

run();