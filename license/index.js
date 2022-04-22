const {
    copyFiles,
    packageJson
} = require('mrm-core');

const {
    baseFilePath
} = require('../lib/constants');

const licenseFilePath = `${baseFilePath}/license`

function task() {
    copyFiles(licenseFilePath, ['LICENSE']);

    packageJson()
        .set('License', 'Apache-2.0')
        .save();
}

module.exports.description = "Adds Apache 2.0 License file and Apache-2.0 to the license field in package.json";

module.exports = task;
