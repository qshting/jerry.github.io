## 说明介绍2

## 如何使用

```bash

# 1. 安装依赖
yarn install

# 2. 本地运行
yarn run docs:dev
```

## 启动失败时的方案

export NODE_OPTIONS="--openssl-legacy-provider"
yarn run docs:dev

## 发布时的操作
1.在分支0225上面提交修改，
2.然后切换发布项目，选gh-pages来进行发布