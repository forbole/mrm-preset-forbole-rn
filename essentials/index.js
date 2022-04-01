const {
    install,
    makeDirs,
    packageJson,
    copyFiles,
    lines
} = require('mrm-core');

const packages = [
    "@react-navigation/native",
    "react-native-screens",
    "react-native-safe-area-context",
    "@react-navigation/stack",
    "react-native-gesture-handler",
    "@react-native-masked-view/masked-view",
    "formik",
    "yup",
    "graphql",
    "@apollo/client"
];

const {
    baseFilePath
} = require('../lib/constants');

const essentialsFilePath = `${baseFilePath}/essentials`

/**
 * Install essential develop packages
 *
 * List of major packages:
 * react-navigation
 * formik (form validation)
 * yup (form validation schemas)
 * graphql & apollo
 */
function task() {
    // Install the packages
    install(
        packages,
        {
            yarn: true,
            dev: false
        }
    );

    // react-navigation compat - Create jest mocks.
    makeDirs('jest');
    copyFiles(essentialsFilePath, ['jest/setup.js'])

    packageJson()
        .merge({
                jest: {
                    setupFiles: [
                        "<rootDir>/jest/setup.js"
                    ]
                }
            }
        )
        .save();

    // @react-navigation/stack compat
    const appJS = lines('App.js').get();
    lines('App.js')
        .set(
            [
                `import 'react-native-gesture-handler`,
                ...appJS
            ]
        )
        .save();

    console.info(`
   ###‼️‼️‼️###
   Remember to run pod install in the ios directory
   ###‼️‼️‼️###
   `);
};

module.exports.description = "Installs essential packages for react-native development";

module.exports = task;
