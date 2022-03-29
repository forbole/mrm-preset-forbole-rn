const {
    install,
    lines,
    makeDirs, packageJson
} = require('mrm-core');

const deps = [
    "@testing-library/react-native",
    "@testing-library/jest-native"
];

const setupAfterEnvConfig = require('./setupAfterEnvConfig');

function task(){
    // Install testing library dependencies
    install(deps, {yarn: true});

    // create jest/setupAfterEnv.js file
    makeDirs('jest');
    const setupAfterEnv = lines('jest/setupAfterEnv.js', setupAfterEnvConfig);
    setupAfterEnv.save();

    // load setupAfterEnv as part of jest config
    packageJson()
        .merge({
            jest:{
                testEnvironment: "jsdom",
                transformIgnorePatterns: [
                    "node_modules/(?!(jest-)?react-native|@react-native-community|@react-native|@react-navigation)"
                ],
                moduleFileExtensions: [
                    "ts",
                    "tsx",
                    "js",
                    "jsx",
                    "json",
                    "node"
                ],
                setupFilesAfterEnv: [
                    "@testing-library/jest-native/extend-expect",
                    "<rootDir>/jest/setupAfterEnv.js"
                ]
            }
        })
        .save();
}

module.exports.description="Install and setup jest for react native projects";

module.exports = task;
