const config =
    `#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx jest --coverage --passWithNoTests
`;

module.exports = config;
