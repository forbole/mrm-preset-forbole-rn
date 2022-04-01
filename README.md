# mrm-preset-forbole-rn

MRM preset for scaffolding react-native projects [@Forbole](https://github.com/forbole).

## Usage
### Pre-requisites
1. Initialize a new typescript react-native project
```shell
npx react-native init {{APP_NAME_GOES_HERE}} --template react-native-template-typescript
```

If installing with `all` option, the following packages should be installed first:
2. lint-staged
```shell
npx mrm@2 lint-staged
```
3. storybook
```shell
npx -p @storybook/cli sb init --type react_native
```

### Installation
1. Install mrm version 2 to local dev dependencies
```shell
yarn add -D mrm
```
2. Install this preset package
```shell
yarn add -D mrm-preset-forbole-rn 
```
3. Run the preset's MRM scripts
```shell
yarn mrm default --preset mrm-preset-forbole-rn 
```
4. Clean Up: After installation, remove mrm and this preset.
```shell
yarn remove mrm mrm-preset-forbole-rn 
```

### Additional Setup
The following tasks are not 100% automatic.
1. storybook

An `index.storybook.js` file will be copied to the root directory, along with the necessary `use:main` and `use:storybook` scripts to switch between app modes. 

The existing `index.js` file in the project root should be copied into `index.main.js` to finalize installation.

2. i18next

`index.js`, `index.main.js` and `index.storybook.js` should be modified by adding the following import to initialize i18n.
```shell
import './src/assets/locales/i18n
```

## Contents
This preset contains the following tasks:
1. eslint
2. jest
3. essentials
4. husky
5. storybook
6. i18next

### eslint
This task installs a custom eslint preset built off of `airbnb` and `react-native-community` presets, as well as configuring eslint with typescript compatibility.

### jest
This task installs [`@testing-library/react-native`](https://www.npmjs.com/package/@testing-library/react-native) and its additional jest matchers, and configures the `transformIgnorePatterns` jest property with better compatibility with react-native, and react-navigation.

### essentials
This task installs several packages that are commonly used in our applications, and configures the project for their use. The current list is as follows:
1. `@react-navigation/native`,
2. `react-native-screens` (@react-navigation dependency)
3. `react-native-safe-area-context` (@react-navigation dependency)
4. `@react-navigation/stack`
5. `react-native-gesture-handler` (@react-navigation/stack dependency)
6. `@react-native-masked-view/masked-view` (@react-native/stack dependency)
7. `formik` - form validation
8. `yup` - form validation schemas
9. `graphql`
10. `@apollo/client`

### husky
This task modifies the default husky installation so that eslint errors are flagged during the pre-commit stage and will prevent the commit from succeeding until the issues are manually fixed. (The default behavior is that eslint errors will be automatically fixed on commit, however this may be unwanted in some cases.)

### storybook
This task modifies the default storybook installation and adds a `SbContainer` decorator component for use when creating stories.

Installation is not 100% automatic (see Addition Setup).

### i18next
This task installs and configures `i18next` for react-native projects, and adds a dummy en locale to act as an example.

Installation is not 100% automatic (see Addition Setup).
