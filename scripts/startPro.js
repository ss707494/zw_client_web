var shelljs = require('shelljs')

function callback (code, stdout, stderr) {
  console.log('Exit code:', code)
  console.log('Program output:', stdout)
  console.log('Program stderr:', stderr)
}

shelljs.rm('-rf', '.next')
shelljs.rm('-rf', '../zw_server_api/client_build/.next')

shelljs.exec('npm run build')

shelljs.cp("-Rf", ".next", '../zw_server_api/client_build');
shelljs.cp("-Rf", './next.config.js', '../zw_server_api/client_build');
shelljs.cp("-Rf", './server.js', '../zw_server_api/client_build');
shelljs.cp("-Rf", './.env', '../zw_server_api/client_build');
shelljs.cp("-Rf", './.env.production', '../zw_server_api/client_build');
shelljs.cp("-Rf", './public', '../zw_server_api/client_build');
// shelljs.exec('npm run prod_start', {}, callback)

