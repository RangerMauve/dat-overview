const { readdir } = require('fs')
const path = require('path')
const { spawn } = require('child_process')
const platform = require('os').platform()

const DIAGRAM_FOLDER = path.join(__dirname, 'diagrams')
const OUTPUT_FOLDER = path.join(__dirname, 'assets')

let MMDC_LOCATION = path.join(__dirname, 'node_modules', '.bin', 'mmdc')
if(platform === 'win32') MMDC_LOCATION += '.cmd'


readdir(DIAGRAM_FOLDER, (err, files) => {
  for(let file of files) {
    const input = path.join(DIAGRAM_FOLDER, file)
    const output = path.join(OUTPUT_FOLDER, file) + '.svg'
    spawn(MMDC_LOCATION, ['-i', input, '-o', output], {
      stdio: 'inherit'
    })
  }
})
