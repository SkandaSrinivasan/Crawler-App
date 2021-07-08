let getChapters = require('./getchapterurls.js')
let downloadChapter = require('./downloadchapter.js')
let urls = []

async function run() {
    urls = await getChapters('https://mangakakalot.com/read-cb1nt158504933429')
    downloadChapter(urls)
}

run()