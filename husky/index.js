const {
    MrmError,
    install,
    makeDirs,
    lines,
    packageJson
} = require('mrm-core');

const preCommitConfig = require('./preCommitConfig');
const prePushConfig = require('./prePushConfig');

function task() {
    // Check if lint-staged is installed, throw error if not
    if(!packageJson().get('devDependencies.lint-staged')){
        throw new MrmError('install lint-staged first - npx mrm@2 lint-staged')
    }

    // Install husky
    install(['husky'], {yarn: true});

    // create pre-commit and pre-push hoojs
    makeDirs('.husky');

    // replace existing husky pre-commit and pre-push
    lines('./.husky/pre-commit').delete()
    lines('./.husky/pre-push').delete()


    lines('./.husky/pre-commit')
        .add(preCommitConfig)
        .save();
    lines('./.husky/pre-push')
        .add(prePushConfig)
        .save();
};

module.exports.description = "Installs husky commit hooks";

module.exports = task;
