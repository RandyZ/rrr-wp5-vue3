const fs = require('fs-extra');
const path = require('path');
exports.loadEnv = (envMode = null) => {
    console.info(`Env Load for enviorment : ${envMode}`);
    require('dotenv').config({ path: './env/.env' });
    if (envMode && fs.existsSync(`./env/.env.${envMode}`)) {
        require('dotenv').config({
            path: `./env/.env.${envMode}`,
            override: true,
        });
    }
    const vuePrefixRE = /^VUE_APP_/;
    const envDefine = {};
    for (const key in process.env) {
        if (key == 'NODE_ENV' || key == 'BASE_URL' || vuePrefixRE.test(key)) {
            envDefine[key] = JSON.stringify(process.env[key]);
        }
    }
    return envDefine;
};
