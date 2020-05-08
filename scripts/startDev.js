var shelljs = require('shelljs')

function errHandle(err) {
  if (err) {
    console.log(err)
    process.exit(0)
  }
}
function callback (code, stdout, stderr) {
  console.log('Exit code:', code)
  console.log('Program output:', stdout)
  console.log('Program stderr:', stderr)
}
// shelljs.exec('node server.js', { windowsHide: true }, callback)

// if (.code !== 0) {
//   shelljs.exit(1)
// }
