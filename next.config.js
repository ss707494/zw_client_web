const path = require('path')

const setEnv = require('dotenv')
;['.env.local', '.env'].forEach(e => {
  setEnv.config({
    path: path.resolve(process.cwd(), e)
  })
})
console.log(process.env.client_api_uri)
module.exports = {
  env: {
    // client_api_uri: 'http://47.75.157.220:4464/type__graphql/api',
    client_api_uri: process.env.client_api_uri,
    customKey: 'my-value',
  },
}
