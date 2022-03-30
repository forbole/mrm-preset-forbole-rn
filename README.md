# mrm-preset-forbole-rn

MRM preset for use in Forbole's react-native projects

## Contents
This preset contains the following tasks:
1. eslint
2. jest
3. essentials
4. husky
5. storybook
6. i18next

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
