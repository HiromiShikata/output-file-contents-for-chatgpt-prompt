# output-file-contents-for-chatgpt-prompt

[![CircleCI](https://dl.circleci.com/status-badge/img/gh/HiromiShikata/output-file-contents-for-chatgpt-prompt/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/HiromiShikata/output-file-contents-for-chatgpt-prompt/tree/main)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

## Usage

```
npx output-file-contents-for-chatgpt-prompt -i ./src/adapter/repositories/testdata
```

### Output

```
// src/adapter/repositories/testdata/File1.txt
Content of File1.txt


// src/adapter/repositories/testdata/File2.txt
Content of File2.txt


// src/adapter/repositories/testdata/dir1/File1.txt
Content of File1.txt
```

### Copy to clipboard

#### Ubuntu

```
npx output-file-contents-for-chatgpt-prompt -i ./src/adapter/repositories/testdata | xclip -sel clip
```
