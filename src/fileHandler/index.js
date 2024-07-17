const fs = require('fs/promises')
const path = require('path')
function readFile(filePath) {
  try {
    return fs.readFile(path.resolve(filePath), { encoding: 'utf-8' })
  } catch (error) {
    console.log('error', error)
    return
  }
}

async function writeFile(str, filePath) {
  try {
    await fs.writeFile(path.resolve(filePath), str)
  } catch (error) {
    console.log('error', error)
  }
}

module.exports = {
  readFile,
  writeFile,
}
