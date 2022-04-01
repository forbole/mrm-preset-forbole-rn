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
        throw new MrmError('install lint-staged first\nnpx mrm@2 lint-staged\n\nAfter that, rerun this task using\nyarn mrm husky --preset mrm-preset-forbole-rn')
    }

    // Install husky
    // install(['husky'], {yarn: true});

    // create pre-commit and pre-push hooks
    // makeDirs('.husky');

    // replace existing husky pre-commit and pre-push
    // disabled as file permissions make git hooks not work
    // lines('./.husky/pre-commit').delete()
    // lines('./.husky/pre-push').delete()
    //
    // lines('./.husky/pre-commit')
    //     .set(preCommitConfig)
    //     .save();
    // lines('./.husky/pre-push')
    //     .add(prePushConfig)
    //     .save();

    packageJson()
        .merge({
            "lint-staged":{
                "*.{js,jsx,ts,tsx}": "eslint --cache --quiet"
            }
        })
        .save();

};

module.exports.description = "Installs husky commit hooks";

module.exports = task;
