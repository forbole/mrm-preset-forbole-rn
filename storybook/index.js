const {
    packageJson,
    MrmError,
    copyFiles,
    install,
    deleteFiles
} = require('mrm-core');

const {
    baseFilePath
} = require('../lib/constants')

const sbFilePath = `${baseFilePath}/storybook`;

const baseSbFiles = [
    'storybook/stories'
];

function task() {
    // Check if storybook has already been initialized
    if (!packageJson().get(`devDependencies.@storybook/react-native`)) {
        throw new MrmError('Initialize storybook first.\nnpx -p @storybook/cli sb init --type react_native\n')
    }

    // Delete default storybook files that came with sb init
    deleteFiles(baseSbFiles);

    // Copy base storybook files to storybook directory
    copyFiles(`${sbFilePath}`, ['storybook/index.js', 'storybook/decorators/SBContainer/index.tsx', 'storybook/decorators/SBProvider/index.tsx']);

    // install sb addons
    install(['@storybook/addon-ondevice-actions'], {yarn: true});

    // copy globalMock to jest/ folder, and add it to jest config in package.json
    copyFiles(sbFilePath, ['jest/globalMock.js']);
    packageJson()
        .merge({
            jest: {
                setupFilesAfterEnv: [
                    "<rootDir>/jest/globalMock.js"
                ]
            }
        }).save();

    // Install react-native-storybook-loader
    install('react-native-storybook-loader', {yarn: true});

    // add rnstl to prestorybook script
    // included storybook/index.js already has reference to loadStories(), no need for modification
    packageJson()
        .appendScript('prestorybook', 'rnstl')
        .save();

    // modify package.json settings so .tsx stories get read
    packageJson()
        .merge({
            config: {
                "react-native-storybook-loader": {
                    "searchDir": [
                        "./src",
                    ],
                    "pattern": "**/*.stories.tsx",
                    "outputFile": "./storybook/storyLoader.js"
                }
            }
        })
        .save();

    // copy index.storybook.js to project root
    copyFiles(baseSbFiles, 'index.storybook.js');

    console.info('A index.storybook.js file has been copied into the project root. This will serve as the app\'s entry point when running storybook. Please make a copy of your existing index.js file as index.main.js');

    // Add copy scripts to package.json
    packageJson()
        .appendScript(
            'use:main',
            'cp index.main.js index.js'
        )
        .appendScript(
            'use:storybook',
            'cp index.storybook.js index.js'
        )
        .save();
}

module.exports.description = 'Install storybook for react native';

module.exports = task;
