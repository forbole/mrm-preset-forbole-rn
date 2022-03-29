const config = require('./config');
const {
    json,
    lines,
    install,
    deleteFiles
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

const ignoreConfig = [
    "assets",
    "storybook",
    "jest"
];


function task() {
    // Install eslint config and plugins to dev-deps
    install(deps, {yarn: true});

    // delete old .eslintrc.js, create new .eslintrc.json
    deleteFiles('.eslintrc.js');
    const eslintConfigJSON = json(
        '.eslintrc.json',
        config
    );
    eslintConfigJSON.save();

    // create .eslintIgnore file
    const eslintIgnore = lines('.eslintignore', ignoreConfig);
    eslintIgnore.save();
}

module.exports.description = 'Adds eslint configured for react native projects';

module.exports = task;
