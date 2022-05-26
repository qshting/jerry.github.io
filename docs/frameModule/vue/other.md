---
title: 二、进阶常识
---

## [一].组件 component

### 1.组件基础
**1.全局注册与局部注册**

```js
Vue.component('my-component-name', {/* ... */})  // 不推荐
```

```js
components: { 
    ComponentA, ComponentB
}
```




**2. props与$emits**

- 单向数据流,所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定(建议在子组件内部不应该改变 prop)
- 子组件$emit通知父元素，自身不做任何操作; 父元素接受参数，进行操作

```html
<misTable 
    :titleStr="titleName" 
    :tableList="tableData" 
    @search="pageSearch">
</misTable>
```

```js
props: {
  tableList: {
        type: Array,
        default: () => { return [] } 
    }
}
methods: {
    // 通知父元素
    searchFn() {
        this.$emit('search', this.param)
    }
}
```

**3.插槽**

- 1）具名插槽，slot根据不同的name名称分发内容（多个使用情况时）
- 2）作用域插槽，是一种特殊类型的插槽，用作一个 (能被传递数据的) 可重用模板，让插槽内容能够访问子组件中才有的数据。

在一个 标签template 元素上使用 v-slot 指令,具名插槽

```html
//父组件
<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>
  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>

//子组件 baseLayout.vue
<slot name="header"></slot>
<slot name="footer"></slot>
```


例：获取子组件的user数据的插槽
```html
//父组件
<current-user>
    <template v-slot:default="slotProps">
        {{ slotProps.user.firstName }}
    </template>

    <template v-slot:other="otherSlotProps">
        ...
    </template>
</current-user>

//子组件 currentUser
<span>
  <slot v-bind:user="user">
    {{ user.lastName }}
  </slot>
</span>
```

**4.动态组件 && 异步组件**
1) 动态组件：使用:is在不同组件之间进行动态切换：

让多个组件使用同一个挂载点，并动态切换，这就是动态组件。通过 Vue 的 component 标签元素加一个特殊的 is 特性来实现
```html
<component :is="get_current_tab" class="tab"></component>
```
2) 动态组件，你有时会想保持这些组件的状态，以避免反复重渲染导致的性能问题

用一个 keep-alive 元素将其动态组件包裹起来。

如：tab切换时

<!-- 失活的组件将会被缓存！-->
```html
<keep-alive>
  <component v-bind:is="currentTabComponent"></component>
</keep-alive>
```

3).异步组件

在大型应用中，需要将应用分割成小一些的代码块，并且只在需要的时候才从服务器加载一个模块。
```js
new Vue({
  // ...
  components: {
    'my-component': () => import('./my-async-component')
  }
})
```

### 2.子组件的三种调用方式


**1.通过子组件名，标签调用**，参数props 和 $emits

**2.构造组件，js代码调用**

1) 没有props，
2) v2中，子组件js的vue.extend构建组件； 挂载使用Vue.prototype.$message = Message
3) 主main里调用一下Vue.use()方法
```js
import Vue from 'vue'
const NoticeConstructor = Vue.extend(require('./Notice.vue').default)

// ...

// 挂载
export default {
  install: Vue => {
    Vue.prototype.$notice = Notice
  }
}
```
v3中： Vue.prototype 替换为 config.globalProperties

**3.指令调用**

子组件，添加install方法(插件方法); main.js使用vue.use(**name)


扩展阅读: [组件的三种调用方式](https://juejin.cn/post/6844903545410420749#heading-1)

### 3.组件多种通信

**1. props / $emit**
```js
// 混合写法
<script>
export default {
  props: {
    msg1: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    console.log(props)
  },
}
</script>
```

```js
// 纯 Vue3 写法(语法糖)
<script setup>
    const props = defineProps({
        msg2:{
            type:String,
            default:""
        }
    })
</script>
```

**2. $children / $parent**

节制地使用 $parent 和 $children - 它们的主要目的是作为访问组件的应急方法。

更推荐用 props 和 events 实现父子组件通信

- $children：获取到一个包含所有子组件(不包含孙子组件)的 VueComponent 对象数组，可以直接拿到子组件中所有数据和方法等
- $parent：获取到一个父节点的 VueComponent 对象，同样包含父节点中所有数据和方法等


**3. expose / ref**

ref：如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；

如果用在子组件上，引用就指向组件实例，可以通过实例直接调用组件的方法或访问数据

```js
// Parent.vue  注意 ref="comp"
<template>
<child ref="comp"></child>
</template>

// 获取子组件对外暴露的属性和方法
<script setup>
    import child from "./child.vue"
    import { ref } from "vue"
    const comp = ref(null)
    const handlerClick = () => {
        console.log(comp.value.childName) // 获取子组件对外暴露的属性
        comp.value.someMethod() // 调用子组件对外暴露的方法
    }
</script>
```

**4. provide / inject**

provide：可以让我们指定想要提供给后代组件的数据或

inject：在任何后代组件中接收想要添加在这个组件上的数据，不管组件嵌套多深都可以直接拿来用
```js
// Parent.vue
<script setup>
    import { provide } from "vue"
    provide("name", "沐华")
</script>

// Child.vue
<script setup>
    import { inject } from "vue"
    const name = inject("name")
    console.log(name)
</script>
```

**5. mitt**

Vue3 中没有了 EventBus 跨组件通信，但是现在有了一个替代的方案 mitt.js，原理还是 EventBus


## [二].路由 router

- router-link 可以在不重新加载页面的情况下更改 URL
- router-view 显示与 url 对应的组件

### 1.动态路由参数

- fullpath,url包含查询参数和hash的完整路径
- path 对应当前路由的路径
- params, 包含动态路由参数
- query对象,url查询参数
- hash,当前路由的hash值
- matched,包含当前路由的所有嵌套路径片段的路由记录
- name, 当前路由的名称
- meta, 路由元信息

```js
this.$route.query.id
```
    
### 2.编程式导航

**编程式导航, 借助router的方法,来实现导航的切换**

- back()    回退一步
- forward() 前进一步
- go()	    指定前进回退步数
- push()    导航到不同url，向 history 栈添加一个新的记录
- replace() 导航到不同url，替换 history 栈中当前记录

```js
this.$router.push({ name: 'user', params: { username: 'eduardo' } })
```

### 3.导航守卫

**导航钩子函数**：导航发生变化时，导航钩子主要用来拦截导航，让它完成跳转或取消.

**钩子函数的位置及方法**
- router全局：beforeEach、afterEach
- 单个路由中：beforeEnter
- 组件内的钩子：beforeRouteEnter、beforeRouteUpdate 、beforeRouteLeave


**1.router实例上的使用(全局作用):**

```js
router.beforeEach((to, from, next) => {
    // 如果没登录则进入登录页
    if(to.meta.login){
        next('/login')
    }else{
        next()
    }
})
```

```js
// 利用router  改变每个页面的title
{
path: '/user/:tip?/:userId?',
component: user,
meta: {
    index: 3,
    title: 'user'
}

router.afterEach((to, from) => {
    if( to.meta.title ){
        window.document.title = to.meta.title
    }else{
        window.document.title = 'moren'
    }
})
```

**2.单个路由中的使用:** beforeEnter

```js
{
    path: '/document',
    name: 'Dcoument',
    beforeEnter(to, from, next){
        console.log("beforeEnter")
        next()
    }
}
```

**3.组件内的钩子**

注意点: 在beforeRouteEnter中,无法获取this, 因为它先执行,此时组件还没有创建.

解决方法: 在next中使用回调函数,用参数的形式获取.
```js
beforeRouteEnter(to, from, next){
    console.log(this) //无法获取this
    next((vm) => {
     vm.test = '改变了'
    })
}

beforeRouteUpdate(to, from, next){
    console.log("beforeRouteUpdate")
    next()
}

beforeRouteLeave(to, from, next){
    next()
}
```

### 4. 滚动行为

当多个路由视图来回切换的时候, 记录上一个页面的滚动条位置.

配置项是scrollBehavior(to,from,savePosition){} 当点击浏览器的前进后退或切换导航触发.

savePosition - 当点击前进/后退时,生成上一个页面的滚动位置记录. 并返回即可.

```js
// 记录滚动时坐标
scrollBehavior(to,from,savePosition){
    if(savePosition){
        return savePosition;
    }else{
        return {x:0,y:0}
    }
}

// 通过hash值,跳转到指定位置
scrollBehavior(to,from,savePosition){
    if(to.hash){
        return {selector: to.hash}
    }
}
```
### 5.路由懒加载

路由懒加载就是只加载你当前点击的那个模块。 按需去加载路由对应的资源，提高首屏加载速度

component的配置接收一个返回 Promise 组件的函数，resolve已被简化省略写法
```js
Vue.use(VueRouter)
const router = new VueRouter({
    routes: [
        {path: '/login', component: () => import('@/views/login/index.vue')},
        {path: '/home', component: () => import('@/views/home/home.vue')}
    ]
})
```

### 6.前端路由鉴权jwt

**1.路由元信息meta**

简单的角色路由设置： 如游客管理员的身份权限，通常直接在前端进行简单的角色权限设置

- 在路由中设置meta：{}来判断访问哪些路由需要指定的权限
- 在进入路由时可以在路由前置钩子router.beforeEach()中判断是否满足条件，满足则next()
```js
router.beforeEach((to, from, next) => {
    //是否需要权限才能访问
    if (to.meta.requiresAuth && !auth.isLoggedIn()) {
        //...
    } 
})
```
用户登录后存储用户信息和token，当token失效，在fetch配置中，返回/login页

**2.路由的动态加载**

复杂的路由权限设置： 比如OA系统、多种角色的权限配置，通常需要后端返回路由列表，前端渲染使用

扩充了解：[vue动态路由实现](https://juejin.cn/post/6995366083305685022#heading-10)

- 1.新建一个公共的asyncRouter.js文件
- 2.创建路由守卫：创建公共的permission.js文件，设置路由守卫
- 3.在main.js中引入permission.js文件
- 4.在login登录的时候将路由信息存储到store中



## [三].状态管理

### 1.Vuex


### 2.Pinia

## [四].自定义指令 directive
```html
<p v-highlight="'yellow'">以亮黄色高亮显示此文本</p>
```

```js
// 1.创建文件并导出配置
export default {
  install(app){
    app.directive('自定义指令名',{ //在创建自定义名称时不要带v-,使用时再携带
      mounted(el,binding){
        // el 为携带自定义指令的dom节点
        // binding 为指令后携带的参数通过.value取出
      }
    })
  }
}

// 2.main.js文件中注册
import direction from './directives'
createApp(App).use(directive).mount('#app')

```

扩展阅读：[Vue3自定义指令-10个常见的实用指令](https://juejin.cn/post/6968996649515515917)

[指令批量注册了](https://juejin.cn/post/7049233225708732429)


## [五].axios请求配置

### 1.简述
axios : 基于Promise的, 用于浏览器和 nodejs服务端通信库

- 支持 Promise API
- 拦截请求和响应
- 转换请求和响应数据
- 取消请求
- 自动转换JSON数据

### 2.配置
```js
import {$axios} from './axiosAPI'

export function BillHead(param) {
   return $axios({
     url: '/headDataController/loadBillHeadData',
     method: 'post',
     params: param
    })
}
```

**实际配置 axiosAPI.js**

```js
import axios from 'axios'
import {Message, Loading} from 'element-ui'
import service from "./request";

let loadingInstance
const CancelToken = axios.CancelToken

// request 拦截器
axios.interceptors.request.use(
  config => { // 在发送请求之前做某事
    console.log('请求开始')
    if (!config.data.closeLoadingAnimation) { //是否有关闭loading的参数
      loadingInstance = Loading.service({fullscreen: true})
    } else {
      loadingInstance = {close: function () {}}
    }
    return config;
  },
  error => { //请求错误时做某些事 异常钩子
    console.log(error);
    return Promise.reject(error);
  }
)

// response 拦截器
axios.interceptors.response.use(
  response => {
    if (typeof response.data === 'string' && response.data.indexOf('xmlns') > -1) {
      response.status = 302
    }
    // Loading 关闭
    loadingInstance.close();
    switch (response.status) {
      case 302:
        // 可能登录超时
        store.state.app.storeSession = true
        break;
      case 401:
        window.location.href = window.location.origin + '/logout'
        break;
      case 404:
        window.location.href = '../views/error/error404.vue'
        break;
    }
    const res = response;
    //统一处理系统级错误
    if (res.status === 500) {
      Message({
        message: '服务器出错啦' + res.statusText,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(res.statusText)
    } else if (res.status === 200) {
      return Promise.reject(res.data)
    } else {
      return Promise.reject(res.statusText)
    }
  },
  error => {
    loadingInstance.close(); //loading关闭
    if (error.message !== 'USERCANCEL') {
      Message({
        message: '数据请求超时',
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

// 普通的JSON请求
export function $axios(config) {
  console.log(location.pathname)
  const params = config.params || {}
  const d = new Date()
  params.timestamp = d.getTime()
  return axios({
    method: config.method || 'POST',
    url: config.url,
    data: params,
    responseType: 'JSON',
    baseURL: process.env.API,
    timeout: config.timeout || 30000,
    headers: {
      accept: 'application/json'
    }
  })
}

// 其他流类型 responseType: 'arraybuffer',
```

