const {
    install,
    json,
    deleteFiles,
    template
} = require('mrm-core');

const aliasPaths = [
    'types',
    'screens',
    'services',
    'navigation',
    'hooks',
    'lib',
    'assets',
    'components',
    'config',
];

const rootFolderPaths = [
    'jest',
    'storybook'
]

const {baseFilePath} = require('../lib/constants');

const tsAliasFilePath = `${baseFilePath}/tsAlias`

function task() {
    // install babel plugin dependency
    install('babel-plugin-module-resolver', {yarn: true});

    // Pre-build the babel.config.js and tsconfig.paths.json
    const babelSrcAlias = aliasPaths.reduce((acc, cur) => ({
        ...acc,
        [cur]: `./src/${cur}`
    }), {});

    const babelRootAlias = rootFolderPaths.reduce((acc, cur) => ({
        ...acc,
        [cur]: `./${cur}`
    }), {});

    const babelAlias = {...babelSrcAlias, ...babelRootAlias};

    const babelPathAlias = [
        'module-resolver',
        {
            root: ['./src'],
            extensions: [
                '.ios.ts',
                '.android.ts',
                '.ts',
                '.ios.tsx',
                '.android.tsx',
                '.tsx',
                '.jsx',
                '.js',
                '.json',
            ],
            alias: babelAlias,
        },
    ]


    // create the babelConfigTemplateFile
    deleteFiles('babel.config.js');
    template('babel.config.js', `${tsAliasFilePath}/babelConfigTemplate.md`)
        .apply({
            pathalias: JSON.stringify(babelPathAlias)
        })
        .save();

    // build tsconfig.paths.json
    const tsSrcPaths = aliasPaths.reduce((acc, cur) => ({
        ...acc,
        [`${cur}`]: [
            `./${cur}`
        ],
        [`${cur}/*`]: [
            `./${cur}/*`
        ],
    }), {});

    const tsRootPaths = rootFolderPaths.reduce((acc, cur) => ({
        ...acc,
        [`${cur}`]: [
            `../${cur}`
        ],
        [`${cur}/*`]: [
            `../${cur}/*`
        ],
    }), {});

    const tsPaths = {
        ...tsSrcPaths,
        ...tsRootPaths
    };

    const tsPathsConfig = {
        "compilerOptions": {
            "baseUrl": "./src",
            "paths": tsPaths
        }
    };

    json('tsconfig.paths.json', tsPathsConfig).save();

    // modify tsconfig.json to extend tsconfig.paths.json
    json('tsconfig.json')
        .merge({
            extends: './tsconfig.paths.json'
        })
        .save();

    console.info('Project has been configured for typescript path aliases. Please run eslint formatting on babel.config.js, and clear npm cache and rebuild the app.');
}

module.exports.description = "Adds typescript alias config for react-native projects."

module.exports = task;
