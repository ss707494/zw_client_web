var shelljs = require('shelljs')

const outDir = '../deploy/dist/client_build'
shelljs.rm('-rf', '.next')
shelljs.rm('-rf', outDir + '/.next')

shelljs.exec('npm run build')

shelljs.cp("-Rf", "./.next", outDir);
shelljs.cp("-Rf", './next.config.js', outDir);
shelljs.cp("-Rf", './server.js', outDir);
shelljs.cp("-Rf", './.env', outDir);
shelljs.cp("-Rf", './.env.production', outDir);
shelljs.cp("-Rf", './public', outDir);

// shelljs.exec('npm run prod_start', {}, callback)

