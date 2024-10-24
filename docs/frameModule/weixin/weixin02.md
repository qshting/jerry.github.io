---
title: 二、进阶常识
---

## 11.自定义组件

### 1. 全局引用 和 局部引用
```js
// 在页面.json中配置
  "usingComponents": {
    "my-test1": "/components/test/test",
  }

  // 在页面的地方使用
  <my-test1></my-test1>
```

```js
// 在app.json中配置
  "usingComponents": {
    "my-test2": "/components/test2/test2",
  }

  // 在页面的地方使用
  <my-test2></my-test2>
```

### 2. 组件和页面的区别

 (1) .js 与.json 文件有明显的不同：
- 组件的 .json 文件中需要声明 "component": true 属性
- 组件的 .js 文件中调用的是 Component() 函数
- 组件的事件处理函数需要定义到 methods 节点中

(2) 组件样式隔离的注意点

- app.wxss 中的全局样式对组件无效
- 只有 class 选择器会有样式隔离效果，id 选择器、属性选择器、标签选择器不受样式隔离的影响
- 建议：在组件和引用组件的页面中建议使用 class 选择器，不要使用 id、属性、标签选择器！

(3) data 和 properties

- data 更倾向于存储组件的私有数据
- properties 更倾向于存储外界传递到组件中的数据

```js
Component({
  // 样式隔离
  options: {
    styleIsolation: 'shared'
  },

  // data和properties
  properties: {
    max: {
      type: Number,
      value: 10
    }
  },
  data: {
    count: 0
  },

  // 方法处理
  methods: {
    addCount() {
      // setData 修改 properties 的值 
      this.setData({
        count: this.properties.count + 1
      })
    },
  }
})

```

### 3. 监听器 observers

```js
  data: { n1: 0,n2: 0,sum: 0 },

  methods: {
    addN1() { this.setData({n1: this.data.n1 + 1}) },
    addN2() { this.setData({n2: this.data.n2 + 1}) }
  },
  
  observers: { 
    // 数据监听节点
    // 监听n1 和 n2的数据变化
    'n1, n2': function (newN1, newN2) { 
      this.setData({ sum: newN1 + newN2})
    }
  }
```

```js
  observers: {
    // 监听对象r,g,b 三个子属性的变化
    'objPer.r, objPer.g, objPer.b': function (r, g, b) {
      this.setData({
        fullColor: `${r}, ${g}, ${b}`
      })
    },

    // 监听对象上的所有属性的变化
    'objA.**': function (obj) {
      this.setData({
        fullColor: `${obj.r}, ${obj.g}, ${obj.b}`
      })
    }
  },
```

### 4. 生命周期

(1）lifetimes 节点

组件生命周期可以在 lifetimes 字段内进行声明
```js
Component({

  lifetimes: {
    created() {
      console.log('created ~~~~~')
    },
    attached() {
      console.log('attached ~~~~~')
    },
    detached() {
      console.log('detached ~~~~~')
    },
  },
})
```

① created：组件实例刚被创建好的时候，created 生命周期函数会被触发
- 此时还不能调用 setData
- 通常在这个生命周期函数中，只应该用于给组件的 this 添加一些自定义的属性字段

② attached：在组件完全初始化完毕、进入页面节点树后， attached 生命周期函数会被触发
- 此时， this.data 已被初始化完毕
- 这个生命周期很有用，绝大多数初始化的工作可以在这个时机进行（例如发请求获取初始数据）

③ detached：在组件离开页面节点树后， detached 生命周期函数会被触发
- 退出一个页面时，会触发页面内每个自定义组件的 detached 生命周期函数
- 此时适合做一些清理性质的工作

(2）pageLifetimes 节点 

组件所在页面的生命周期函数，需要定义在 pageLifetimes 节点中
```js
Component({

  pageLifetimes: {
    show() {
      console.log('show')
      this._randomColor()
    },
    hide() {
      console.log('hide')
    },
    resize() {
      console.log('resize')
    }
  }
})
```

### 5. 插槽

1. 定义多个插槽

可以在组件的 .wxml 中使用多个 slot 标签，以不同的 name 来区分不同的插槽

```html
<view>
  <slot name="before"></slot>
  <view>这里是组件的内部结构</view>
  <slot name="after"></slot>
</view>
```

2. 默认插槽

在使用带有多个插槽的自定义组件时，需要用 slot 属性来将节点插入到不同的 slot

```html
 <my-test4>
	<view slot="before">这是通过插槽填充的内容</view>
  <view slot="after">~~~~~~~</view>
</my-test4>
```

### 6. 组件间通信

父子组件通信：

① 属性绑定
- 用于父组件向子组件的指定属性设置数据，仅能设置 JSON 兼容的数据

② 事件绑定
- 用于子组件向父组件传递数据，可以传递任意数据

③ 获取组件实例
- 父组件还可以通过 this.selectComponent() 获取子组件实例对象
- 这样就可以直接访问子组件的任意数据和方法

（1）父组件
```js
<my-test5 count="{{count}}" bind:sync="syncCount"></my-test5>

// 事件绑定
// 通过 e.detail 获取到子组件传递过来的数据
syncCount(e) {
  this.setData({
    count: e.detail.value
  })
},
```

（2）子组件
```js
<button bindtap="addCount">+1</button>

Component({
  // 属性绑定
  properties: {
    count: Number
  },

  methods: {
    addCount() {
      this.setData({
        count: this.properties.count + 1
      })
      // 触发自定义事件，将数值同步给父组件
      this.triggerEvent('sync', { value: this.properties.count })
    }
  }
})

```

（3）获取组件实例 - 类似ref
- 可在父组件里调用 this.selectComponent("id或class选择器") ，
- 获取子组件的实例对象，从而直接访问子组件的任意数据和方法。
- 调用时需要传入一个选择器，例如 this.selectComponent(".my-component")。

```js
// 父组件
<my-test5 count="{{count}}" bind:sync="syncCount" id="customA"></my-test5>
<button bindtap="getChild">获取子组件的实例对象</button>


getChild() {
  const child = this.selectComponent('#customA')
  console.log(child)
  // child.setData({
  //   count: child.properties.count + 1
  // })
  // 直接调用子组件的方法
  child.addCount()
},
```


### 7. 自定义组件 - behaviors

- behaviors - 代码共享的特性, 是小程序中，类似于 Vue.js 中的 “mixins”。
- 包含一组属性、数据、生命周期函数和方法。

（1）创建 behavior 实例对象

```js
// Behavior.js
module.exports = Behavior({
  data: {
    username: 'zs'
  },
  properties: {},
  methods: {}
})

```

（2）导入并使用 behavior

```js
// 使用公用的username
<view>在behavior中定义的用户名是：{{username}}</view>


// 组件内使用
const myBehavior = require('../../behaviors/my-behavior')
Component({
  behaviors: [myBehavior],
})
```

## 12.使用 npm 包

目前，小程序中已经支持使用 npm 安装第三方包，从而来提高小程序的开发效率。但是能供小程序使用的包却“为数不多”。

npm 包有如下 3 个限制：
- ① 不支持依赖于 Node.js 内置库的包
- ② 不支持依赖于浏览器内置对象的包
- ③ 不支持依赖于 C++ 插件的包

1）Vant Weapp

- 安装npm包及配置
- https://vant-ui.github.io/vant-weapp/#/quickstart#an-zhuang

```js
// app.json
"usingComponents": {
  "van-button": "@vant/weapp/button/index"
}

// 页面的.wxml
<van-button type="primary">按钮</van-button>
```

- 定制全局主题样式
- 定制全局主题样式

所有可用的颜色变量，请参考 Vant 官方提供的配置文件：
https://github.com/youzan/vant-weapp/blob/dev/packages/common/style/var.less
Vant Weapp 使用 CSS 变量来实现定制主题。 关于 CSS 变量的基本用法，请参考 MDN 文档：
https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties


2) API Promise化

安装 miniprogram-api-promise

```js
// app.js
// 在入口处，调用一次promisifyAll(), 可实现异步API的 Promise化
import { promisifyAll } from 'miniprogram-api-promise'

const wxp = wx.p = {}
promisifyAll(wx, wxp)

```

```js
<van-button type="primary" bindtap="getInfo">按钮</van-button>

async getInfo() {
  const {data: res} = await wx.p.request({
    method: 'GET',
    url: 'https://www.escook.cn/api/get',
    data: {
      name: 'zs',
      age: 20
    }
  })
  console.log(res)
},
```

## 13.全局数据共享

- 全局数据共享（又叫做：状态管理）是为了解决组件之间数据共享的问题。
- 开发中常用的全局数据共享方案有：Vuex、Redux、MobX 等。

在小程序中，可使用 mobx-miniprogram 配合 mobx-miniprogram-bindings 实现全局数据共享。其中：
- mobx-miniprogram 用来创建 Store 实例对象
- mobx-miniprogram-bindings 用来把 Store 中的共享数据或方法，绑定到组件或页面中使用

### 1. 创建MobX的实例 store.js
```js
// 在这个 JS 文件中，专门来创建 Store 的实例对象
import { observable, action } from 'mobx-miniprogram'

export const store = observable({
  // 数据字段
  numA: 1,
  numB: 2,
  activeTabBarIndex: 0,
  // 计算属性
  get sum() {
    return this.numA + this.numB
  },
  // actions 函数，专门来修改 store 中数据的值
  updateNum1: action(function (step) {
    this.numA += step
  }),
  updateNum2: action(function (step) {
    this.numB += step
  }),
  updateActiveTabBarIndex: action(function(index) {
    this.activeTabBarIndex = index
  })
})
```

### 2. 将 Store 中的成员绑定到页面中
```js
// pages/message/message.js
import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { store } from '../../store/store'

Page({
  onLoad: function (options) {
    // 初始化绑定
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['numA', 'numB', 'sum'],
      actions: ['updateNum1']
    })
  },

  onUnload: function () {
    // 销毁绑定
    this.storeBindings.detroyStoreBindings()
  },

  // 按钮事件处理 - 加参数，使用action
  btnHandler(e) {
    this.updateNum1(e.target.dataset.step)
  },

})
```

在页面上使用 Store 中的成员

```html
<!--pages/message/message.wxml-->
<view>{{numA}} + {{numB}} = {{sum}}</view>
<van-button type="primary" bindtap="btnHandler" data-step="{{1}}">numA + 1</van-button>
<van-button type="danger" bindtap="btnHandler" data-step="{{-1}}">numA - 1</van-button>

```


### 3. 将 Store 中的成员绑定到组件中

```js
// components/numbers/numbers.js
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../../store/store'

Component({
  behaviors: [storeBindingsBehavior],
   // 初始化绑定 -数据源
  storeBindings: {
    store,
    fields: {
      numA: 'numA',
      numB: 'numB',
      sum: 'sum'
    },
    actions: {
      updateNum2: 'updateNum2'
    }
  },

  // 按钮事件处理 - 加参数，使用action
  methods: {
    btnHandler2(e) {
      this.updateNum2(e.target.dataset.step)
    }
  }
})
```

在页面上使用 Store 中的成员
```html
<!--components/numbers/numbers.wxml-->
<view>{{numA}} + {{numB}} = {{sum}}</view>
<van-button type="primary" bindtap="btnHandler2" data-step="{{1}}">numB + 1</van-button>
<van-button type="danger" bindtap="btnHandler2" data-step="{{-1}}">numB - 1</van-button>
```

## 14.分包

- 分包指的是把一个完整的小程序项目，按照需求划分为不同的子包，
- 在构建时打包成不同的分包，用户在使用时按需进行加载。

优点：
- 可以优化小程序首次启动的下载时间
- 在多团队共同开发时可以更好的解耦协作

分包后项目的构成：
- 小程序项目由 1 个主包 + 多个分包组成：
- 主包：项目的启动页面或TabBar页面 + 公共资源
- 分包：分包页A页面 + 私有资源

分包的体积限制：
- 整个小程序所有分包大小不超过 16M（主包 + 所有分包）
- 单个分包/主包大小不能超过 2M

分包的加载规则：
- 在小程序启动时，默认会下载主包并启动主包内页面
- 当用户进入分包内某个页面时，客户端会把对应分包下载下来，下载完成后再进行展示

pages 和 subpackages
```js
{
  "pages": [
    "pages/home/home",
    "pages/message/message",
    "pages/contact/contact"
  ],
  "subpackages": [
    {
      "root": "pkgA",
      "name": "p1",
      "pages": [
        "pages/cat/cat",
        "pages/dog/dog"
      ]
    },
    {
      "root": "pkgB",
      "name": "p2",
      "pages": [
        "pages/apple/apple"
      ],
      "independent": true
    }
  ],
}
```

分包预下载指的是：在进入小程序的某个页面时，由框架自动预下载可能需要的分包，从而提升进入后续分包页面时的启动速度。