## 说明介绍2

## 如何使用

```bash

# 1. 安装依赖
yarn install

# 2. 本地运行
yarn run docs:dev
```

## (1)启动失败时的方案

export NODE_OPTIONS="--openssl-legacy-provider"
yarn run docs:dev

## (2)打包手动

1. 打包
export NODE_OPTIONS="--openssl-legacy-provider"
yarn run docs:build

2. 打包后发布
1.在源代码 - 在分支0225上面提交修改，
2.然后切换发布项目，在文件夹fabu2024上，选gh-pages来进行发布