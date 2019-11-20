const { readdir, readFile, writeFile } = require('fs')
const path = require('path')
const { spawn } = require('child_process')
const platform = require('os').platform()
const { emojify } = require('node-emoji')

const DIAGRAM_FOLDER = path.join(__dirname, 'diagrams')
const OUTPUT_FOLDER = path.join(__dirname, 'assets')

let MMDC_LOCATION = path.join(__dirname, 'node_modules', '.bin', 'mmdc')
if(platform === 'win32') MMDC_LOCATION += '.cmd'


readdir(DIAGRAM_FOLDER, (err, files) => {
  for(let file of files) {
    const input = path.join(DIAGRAM_FOLDER, file)
    const output = path.join(OUTPUT_FOLDER, file) + '.svg'
    const opts = [
      '-i', input,
      '-o', output,
      '-t', 'neutral'
    ]
    spawn(MMDC_LOCATION, opts, {
      stdio: 'inherit'
    }).once('exit', () => {
      converEmoji(output)
    })
  }
})

function converEmoji(location) {
  readFile(location, 'utf8', (err, file) => {
    if(err) return console.error(err)
    const converted = emojify(file)
    writeFile(location, converted, (err) => {
      if(err) console.error(err)
    })
  })
}
