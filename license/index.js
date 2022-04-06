const {
    copyFiles
} = require('mrm-core');

const {
    baseFilePath
} = require('../lib/constants');

const licenseFilePath = `${baseFilePath}/license`

function task() {
    copyFiles(licenseFilePath, ['LICENSE']);
}

module.exports.description = "Adds Forbole's Apache 2.0 license to the project.";

module.exports = task;
