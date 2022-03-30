const {
    install,
    deleteFiles,
    copyFiles
} = require('mrm-core');

const deps = [
    "eslint-config-airbnb",
    "eslint-config-recommended",
    "eslint-config-typescript",
    "eslint-import-resolver-typescript",
    "eslint-plugin-import",
    "eslint-plugin-jsx-a11y",
    "eslint-plugin-react",
    "eslint-plugin-react-hooks",
    "eslint-plugin-react-native"
];

const {
    baseFilePath
} = require('../lib/constants');

const eslintFilePath = `${baseFilePath}/eslint`;

function task() {
    // Install eslint config and plugins to dev-deps
    install(deps, {yarn: true});

    // delete old .eslintrc.js, copy .eslintignore and .eslitnrc.json files
    deleteFiles('.eslintrc.js');
    copyFiles(eslintFilePath, ['.eslintignore', '.eslintrc.json']);
}

module.exports.description = 'Adds eslint configured for react native projects';

module.exports = task;
