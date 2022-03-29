const {
    install,
    makeDirs,
    lines,
    packageJson
} = require('mrm-core');

const jestSetupConfig = require('./jestSetupConfig');
const packages = require('./packages');

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
    lines('jest/setup.js')
        .add(jestSetupConfig)
        .save();

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

    console.info(`
   ###‼️‼️‼️###
   Remember to run pod install in the ios directory
   ###‼️‼️‼️###
   `);
};

module.exports.description = "Installs essential packages for react-native development";

module.exports = task;
