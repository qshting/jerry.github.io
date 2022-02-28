// 前端
const html = require('./frontend/html/index.js');
const css = require('./frontend/css/index.js');
const javascript = require('./frontend/javascript/index.js');
const jsTopic = require('./frontend/jsTopic/index.js');
const es6 = require('./frontend/es6/index.js');
const webpack = require('./frontend/webpack/index.js');
const babel = require('./frontend/babel/index.js');
const webpack4 = require('./frontend/webpack4/index.js');
const typescript = require('./frontend/ts/index.js');
const react = require('./frontend/react/index.js');
const web = require('./frontend/web/index.js');

// 框架
const vue = require('./frameModule/vue/index.js');
const ReactNative = require('./frameModule/ReactNative/index.js');
const weixin = require('./frameModule/weixin/index.js');

// 后端
const docker = require('./backend/docker/index.js');
const nodejs = require('./backend/nodejs/index.js');
const koa = require('./backend/koa/index.js');
const mongodb =require('./backend/mongodb/index.js');
const mysql = require('./backend/mysql/index.js');
const nginx = require('./backend/nginx/index.js');
const http = require('./backend/http/index.js');

/**
 * 侧边栏的配置
 * 当路由深度越深时应当排序在更前方
 * 示例: /frontend 和 /frontend/css
 * 应当将 /frontend/css 写在更上方
 */
module.exports = {
  // 前端 frontend
  '/frontend/html/': html,
  '/frontend/css/': css,
  '/frontend/javascript/': javascript,
  '/frontend/jsTopic/': jsTopic,
  '/frontend/es6/': es6,
  '/frontend/react/': react,
  '/frontend/webpack/': webpack,
  '/frontend/webpack4/': webpack4,
  '/frontend/babel/': babel,
  '/frontend/typescript/': typescript,
  '/frontend/web/': web,

  // 框架
  '/frameModule/vue/': vue,
  '/frameModule/ReactNative/': ReactNative,
  '/frameModule/weixin/': weixin,

  // 后端 backend
  '/backend/docker/': docker,
  '/backend/nodejs/': nodejs,
  '/backend/koa/': koa,
  '/backend/mongodb/': mongodb,
  '/backend/mysql/': mysql,
  '/backend/nginx/': nginx,
  '/backend/http/': http,
};