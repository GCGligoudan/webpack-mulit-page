const glob = require('glob')
const path = require('path')

function getEntry() {
  // let globPath = 'src/**/html/*.html'
  let globPath = 'src/**/*.html'
  // (\/|\\\\) 这种写法是为了兼容 windows和 mac系统目录路径的不同写法
  // let pathDir = 'src(\/|\\\\)(.*?)(\/|\\\\)html'
  let pathDir = 'src(\/|\\\\)(.*?)(\/|\\\\)'
  let files = glob.sync(globPath)
  let dirname, entries = []
  for (let i = 0; i < files.length; i++) {
    dirname = path.dirname(files[i])
    // console.log(dirname)
    entries.push(dirname.replace(new RegExp('^' + pathDir), '$2').replace('src/', ''))
    // console.log(entries)
  }

//  console.log(entries)
  return entries
}

function addEntry() {
  let entryObj = {}
  getEntry().forEach(item => {
    entryObj[item] = path.resolve(__dirname,'src', item, 'index.js')
  })
  return entryObj
}
// addEntry()
console.log(addEntry()['slotchange'])
