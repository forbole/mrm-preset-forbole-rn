const {
    install,
    copyFiles
} = require('mrm-core');

const packages = [
    'i18next',
    'react-i18next'
];

const {
    baseFilePath
} = require('../lib/constants');

const i18nFilePath = `${baseFilePath}/i18next`;

function task(){
    // Install dependencies
    install(packages, {yarn: true, dev: false});

    // copy i18n files to project directory
    copyFiles(i18nFilePath, [
        'locales/en/common.js',
        'locales/en/index.ts',
        'locales/i18n.ts'
    ]);

    console.info('i18next: Installation is not 100% automatic! Please see Additional Installation step in the README for details.')

}

module.exports.description = "Installs i18next for react-native";

module.exports = task;
