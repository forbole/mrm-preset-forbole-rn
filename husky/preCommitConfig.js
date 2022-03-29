// lint-staged by default already creates a pre-commit hook, however this script can override it.
const config =
    `#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
`;

module.exports = config;
