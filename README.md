# mrm-preset-forbole-rn

MRM preset for use in Forbole's react-native projects

## Contents
This preset contains the following tasks:
1. eslint
2. jest
3. essentials
4. husky
5. storybook

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
yarn mrm all --preset mrm-preset-forbole-rn 
```
4. Clean Up: After installation, remove mrm and this preset.
```shell
yarn remove mrm mrm-preset-forbole-rn 
```
