const fs = require('fs-extra')
const pkgInfo = require('../package.json')
exports.loadEnv = (envMode = null) => {
  require('dotenv').config({ path: './env/.env' })
  if (envMode && fs.existsSync(`./env/.env.${envMode}`)) {
    require('dotenv').config({
      path: `./env/.env.${envMode}`,
      override: true,
    })
  }
  const vuePrefixRE = /^VUE_APP_/
  const envDefine = {
    VUE_APP_PKG_NAME: JSON.stringify(pkgInfo.name),
    VUE_APP_PKG_VERSION: JSON.stringify(pkgInfo.version),
    VUE_APP_PKG_DESCRIPTION: JSON.stringify(pkgInfo.description),
  }
  for (const key in process.env) {
    if (key === 'NODE_ENV' || key === 'BASE_URL' || vuePrefixRE.test(key)) {
      envDefine[key] = JSON.stringify(process.env[key])
    }
  }
  return envDefine
}
