---
title: 三、常见问题
---

## 1. 安装超时(install timeout)

cnpm : 国内对npm的镜像版本
```js
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

yarn 和 npm 改源大法
```js
npm config : npm config set registry https://registry.npm.taobao.org
yarn config : yarn config set registry https://registry.npm.taobao.org
```

## 2. can’t not find ‘xxModule’
- 找不到某些依赖或者模块
- 这种情况一般报错信息可以看到是哪个包抛出的信息.，一般卸载这个模块,安装重新安装下即可.

## 3. data必须返回一个对象

报错：data functions should return an object\
这个问题是 vue 实例内,单组件的data必须返回一个对象;如下

```js
export default {
  name: 'page-router-view',
  data () {
      return {
        tabs: [
          {
            title: '财务信息',
            url: '/userinfo'
          },
        ]
      }
    }
}

```

为什么要 return 一个数据对象呢? 
 - 官方解释如下: data 必须声明为返回一个初始数据对象的函数，因为组件可能被用来创建多个实例。
 - 如果 data 仍然是一个纯粹的对象，则所有的实例将共享引用同一个数据对象

## 4. 事件不生效

我给组件内的原生控件添加事件,怎么不生效了!!!

```js
<!--究其原因,少了一个修饰符 .native-->
<router-link :to="item.menuUrl" @click.native="toggleName=''">
  <i :class="['fzicon',item.menuIcon]"></i>
  <span>{{item.menuName}}</span>
</router-link>
```

## 5. this的问题

我在函数内用了this.xxx=,为什么抛出Cannot set property ‘xxx’ of undefined;

这又是this的套路了..this是和当前运行的上下文绑定的...\
一般你在axios或者其他 promise , 或者setInterval 这些默认都是指向最外层的全局钩子.\
简单点说:"最外层的上下文就是 window,vue内则是 Vue 对象而不是实例!";

解决方案:
- 暂存法: 函数内先缓存 this , let that = this;(let是 es6, es5用 var)\
- 箭头函数: 会强行关联当前运行区域为 this 的上下文;

## 6. 小图片渲染

小图片渲染出来却是 data\:image/png;base64xxxxxxxx
- 这个是 webpack 里面的对应插件处理的，对于小于多少 K 以下的图片(规定的格式)直接转为 base64格式渲染;\
- 具体配置在webpack.base.conf.js里面的rules里面的 url-loader，这样做的好处:在网速不好的时候先于内容加载和减少http的请求次数来减少网站服务器的负担。

## 7. 唯一的父类

Component template shold contain exactly one root element.If you are useing v-if on multiple elements , xxxxx

- 大体就是说,单组件渲染 DOM 区域必须要有一个根元素,不能出现同级元素. 可以用v-if和v-else-if指令来控制其他元素达到并存的状态。\
- 换个直白的解释,就是有一个唯一的父类,包裹者; 比如一个 div(父包含块) 内部多少个同级或者嵌套都行,但是最外层元素不能出现同级元素!

## 8. 跨域问题怎么破

No ‘Access-Control-Allow-Origin’ header is present on the requested resource.

> 1.  CORS , 前后端都要对应去配置,IE10+
> 2.  nginx 反向代理,一劳永逸 < -- 线上环境可以用这个

线下开发模式,比如你用了vue-cli, 里面的 webpack 有引入了proxyTable这么个玩意, 也可以做接口反向代理。

```js
// 在 config 目录下的index.js
proxyTable: {
  "/bp-api": {
    target: "http://new.d.st.cn",
    changeOrigin: true,
    // pathRewrite: {
    //   "^/bp-api": "/"
    // }
  }
}
// target : 就是 api 的代理的实际路径
// changeOrigin: 就是是变源,必须是...
// pathRewrite : 就是路径重定向,一看就知道

```

当然还有依旧坚挺的jsonp大法!不过局限性比较多,比较适合一些特殊的信息获取!

## 9. 视图不更新

我需要遍历的数组值更新了,值也赋值了,为什么视图不更新!

那是因为有局限性啊,官方文档也说的很清楚,只有一些魔改的之后的方法提供跟原生一样的使用姿势(却又可以触发视图更新);\
一般我们更常用(除了魔改方法)的手段是使用\:this.\$set(obj,item,value);

## 10. 样式隔离

为什么我的组件间的样式不能继承或者覆写啊\

单组件开发模式下,请确认是否开启了 css模块化功能!也就是scoped(vue-cli 里面配置了,只要加入这个属性就自动启用)。
```js
<style lang="scss" scoped></style>
```

为什么不能继承或者覆写呢,那是因为每个类或者 id 乃至标签都会给自动在css后面添加hash! 比如：
```js
// 写的时候是这个
.trangle{}
// 编译过后,加上了 hash
.trangle[data-v-1ec35ffc]{}

```

这些都是在 css-loader 里面配置!!!

## 11. 图片访问路径错误

CSSbackground引入图片打包后,访问路径错误\
因为打包后图片是在根目录下,你用相对路径肯定报错啊....\
你可以魔改 webpack 的配置文件里面的static为./static...但是不建议。你若是把图片什么丢到assets目录下,然后相对路径,打包后是正常的。

## 12. 组件没有正确引入
Unknown custom element: \<xxx> - did you register the component correctly?

组件没有正确引入或者正确使用,依次确认

> 导入对应的组件\
> 在 components 内声明\
> 在 dom 区域声明标签

## 13. axios的post请求后台接受不到

axios默认是 json 格式提交,确认后台是否做了对应的支持;若是只能接受传统的表单序列化,就需要自己写一个转义的方法...当然还有一个更加省事的方案,装一个小模块qs.

```js
npm install qs -S
// 然后在对应的地方转就行了..单一请求也行,拦截器也行...我是写在拦截器的.
// 具体可以看看我 axios 封装那篇文章
//POST传参序列化(添加请求拦截器)
Axios.interceptors.request.use(
  config => {
    // 在发送请求之前做某件事
    if (
      config.method === "post"
    ) {
      // 序列化
      config.data = qs.stringify(config.data); // ***** 这里转义
    }

    // 若是有做鉴权token , 就给头部带上token
    if (localStorage.token) {
      config.headers.Authorization = localStorage.token;
    }
    return config;
  },
  error => {
    Message({
      //  饿了么的消息弹窗组件,类似toast
      showClose: true,
      message: error,
      type: "error.data.error.message"
    });
    return Promise.reject(error.data.error.message);
  }
);

```

## 14. 组件的通讯有哪几种啊!

基本最常用的是这几种;

> 父传子: props\
> 子传父: emit\
> 兄弟通讯\:event bus: 就是找一个中间组件来作为信息传递中介\
> vuex: 信息树

## 15. vuex的持久化

- vuex的用户信息为什么还要存一遍在浏览器里(sessionStorage or localStorage)
- 因为 vuex的 store 干不过刷新啊，保存在浏览器的缓存内,若用户刷新的话,值再取一遍呗;


## 16. nginx部署

线上若是 nginx,如何部署?以及反向代理这些\
将node端的服务端口放入服务器的80端口，做反向代理，这里用的是3000端口来做示范

```js
# 先定义一个website变量，方便管理以后端口的变更，不会影响到后续的80端口其他的操作
upstream website{
  server 127.0.0.1:3000;
}
 
server {
  listen 80;
# 业户逻辑... ...
####
  location / {
        proxy_pass    http://website;
        proxy_redirect default ;
  }
####  
}
```

## 17. \<template>标签

 \<template>是什么,html5的标签么\
你猜对了..html5的标签还真有这么一个，不过 Vue 的 template 有点不一样,不是去给浏览器解析的。\
你可以理解为一个临时标签,用来方便你写循环,判断的....\
因为最终 template 不会解析到浏览器的页面,他只是在 Vue 解析的过程充当一个包裹层!最终我们看到的是内部处理后的组合的 DOM 结构!

## 18. 二次压缩报错

错误：ERROR in static/js/xxxxxxx.js from UglifyJs

我知道其中一种情况会报这种情况,就是你引入的 js,是直接引入压缩版本后的 js(xxx.min.js);\
然后 webpack 内又启用了 UglifyJs(压缩 JS的), 二重压缩大多都会报错!!\
解决方案:引入标准未压缩的 JS


## 19. 路径别名

单组件中里面的 import xxx from ‘@/components/layout/xxx’中的@是什么鬼!

这是 webpack 方面的知识,看到了也说下吧...webpack可以配置alias(也就是路径别名),玩过 linux 或者 mac 都知道。\
依旧如上,会自己搭脚手架的不用我说了...看看 vue-cli 里面的;\
文件名: build -> webpack.base.conf.js

    resolve: {
        extensions: [".js", ".vue", ".json"], // 可以导入的时候忽略的拓展名范围
        alias: {
          vue$: "vue/dist/vue.esm.js",  
          "@": resolve("src"),  // 这里就是别名了,比如@就代表直接从/src 下开始找起!!!
          "~": resolve("src/components")
        }
    },



## 20. SCSS(SASS) 还是 less,stylus

三者都是预处理器;\
scss 出现最久,能做的功能比较多,但是若是普通的嵌套写法,继承,mixin 啊，这三个都差不多..\
会其中一个其他两个的粗浅用法基本也会了，不过写法有些差异:

> scss: 写法上是像 css 靠齐\
> sass : 其实也就是 scss , 只是写法不一样...靠的是缩进\
> less : 跟 css 基本靠齐\
> stylus : 一样,靠缩进..跟pug(Jade)一样

使用环境的差异:

> scss 可以借助 ruby 或者 node-sass 编译\
> less 可以用 less.js 或者对应的 loader 解析\
> stylus 只能借助 loader 解析,它的出现就是基于 node 的

也有一个后起之秀,主打解耦,插件化的!!! 那就是PostCSS,这个是后处理器! 有兴趣的可以自行去了解,上面的写法都能借助插件实现!


## 21. 组件可以缓存么?

可以,用keep-alive;\
不过是有代码的..占有内存会多了...所以无脑的缓存所有组件!!!别说性能好了..切换几次,有些硬件 hold不住的,浏览器直接崩溃或者卡死..\
所以keep-alive一般缓存都是一些列表页,不会有太多的操作,更多的只是结果集的更换..给路由的组件meta增加一个标志位,结合v-if就可以按需加上缓存了!

## 22. package.json

package.json里面的dependencies 和devDependencies的差异!

其实不严格的话,没有特别的差异;若是严格,遵循官方的理解;\
dependencies : 存放线上或者业务能访问的核心代码模块,比如 vue,vue-router;\
devDependencies: 处于开发模式下所依赖的开发模块,也许只是用来解析代码,转义代码,但是不产生额外的代码到生产环境, 比如什么babel-core这些 如何把包安装到对应的依赖下呢?

```
npm install --save xxxx // dependencies
npm install --save-dev xxxx // devDependencies

//也能用简易的写法(i:install,-S:save,-D:save-dev)

npm i -S xxxx // npm install --save xxxx
npm i -D xxxx // npm install --save-dev xxxx 

```

## 23. 首屏优化

“首屏加载比较慢!!怎么破!打包文件文件比较大”

依次排除和确认:\
减少第三方库的使用,比如jquey这些都可以不要了,很少操作 dom,而且原生基本满足开发。\
若是引入moment这些,webpack 排除国际化语言包。\
webpack 常规压缩js,css, 愿意折腾的还可以引入 dll 这些。\
路由组件采用懒加载。\
加入路由过渡和加载等待效果,虽然不能解决根本,但起码让人等的舒心一点不是么!!!\
整体下来,打包之后一般不会太大;\
但是倘若想要更快?那就只能采用服务端渲染(SSR)了,可以避免浏览器去解析模板和指令这些;\
直接返回一个 html ....还能 seo...

## 24. Vue的seo优化
Vue SPA 没法做优化(SEO)!有解决方案么\
可以的,SSR(服务端渲染就能满足你的需求),因为请求回来就是一个处理完毕的 html，现在 vue 的服务端开发框架有这么个比较流行,如下Nuxt.js。



