let getChapters = require('./getchapterurls.js')
let downloadChapter = require('./downloadchapter.js')
let urls = []

async function run() {
    if(process.argv.length < 3){
        console.error("\x1b[31m", "Please provide chapter url")
        process.exit()
    }
    urls = await getChapters(process.argv[2])
    console.log('Chapter List is as below:')
    console.log('"\x1b[1m"', urls)
    downloadChapter(urls)
}

run()