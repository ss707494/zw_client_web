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

shelljs.exec('git pull')

shelljs.exec('next build')

shelljs.exec('cross-env NODE_ENV=production node server.js', {}, callback)

