---
title: 知识概述
---

小程序的逻辑层和渲染层是分开的，逻辑层运行在 JSCore，并没有一个完整浏览器对象，因而缺少相关的DOM API和BOM API。

同时 JSCore 的环境同 NodeJS 环境也是不尽相同，所以一些 NPM 的包在小程序中也是无法运行的。

## 一. 小程序代码构成

- json -- 静态配置的角色，配置窗口的外观和表现
- wxml -- 类似 HTML 的角色
- wxss -- CSS 大部分的特性
- js -- 处理用户的操作

**JSON 配置 （或小程序配置）**
- a- 项目配置有 app.json 和 project.config.json
- b- 页面配置有 pages/logs 目录下的logs.json

### 1.小程序全局配置 app.json

app.json 是当前小程序的全局配置，包括了小程序的所有页面路径、窗口外观、界面表现、网络超时时间、底部 tab 等

完整 https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html

```json
{
  // 所有页面路径
  "pages":[ 
    "pages/index/index",
    "pages/logs/logs"
  ],
  // 所有页面的背景色，文字颜色
  "window":{ 
    "backgroundTextStyle":"light",
    "navigationBarBackgroundColor": "#fff",
    "navigationBarTitleText": "WeChat",
    "navigationBarTextStyle":"black"
  },
  //指明 sitemap.json 的位置
    "sitemapLocation": "sitemap.json"
}
```

### 2.工具配置 project.config.json

包括编辑器的颜色、代码上传时自动压缩等等一系列选项的开发者工具的配置(开发者工具-详情-项目设置)

完整 https://developers.weixin.qq.com/miniprogram/dev/devtools/projectconfig.html
```json
// 范例 https://www.jianshu.com/p/ce7b45b5f9c9
{
	"description": "项目配置文件",
	"packOptions": {
		"ignore": []
	},
	"setting": {  //项目设置
		"urlCheck": false, //不检查安全域名和 TLS 版本
		"es6": true,  //启用 es6 转 es5
		"postcss": true, //上传代码时样式自动补全
		"minified": true,  //上传代码时自动压缩
		"newFeature": true,  //新特征，文档中未描述
		"autoAudits": false,
		"checkInvalidKey": true
	},
	"compileType": "miniprogram", //编译类型-普通小程序项目
	"libVersion": "2.7.0",
	"appid": "wxdf3f04e841cfe70f",
	"projectname": "%E6%A0%87%E5%87%86%E7%89%88",
	"debugOptions": {  // 调试配置选项
		"hidedInDevtools": []
	},
	"isGameTourist": false,
	"simulatorType": "wechat",
	"simulatorPluginLibVersion": {},
	"condition": {  //编译模式，增加编译模式时，会添加到下面的对应数组
		"search": {
			"current": -1,
			"list": []
		},
		"conversation": {
			"current": -1,
			"list": []
		},
		"plugin": {  //插件
			"current": -1,
			"list": []
		},
		"game": {   //小游戏
			"currentL": -1,
			"list": []
		},
		"miniprogram": {  //小程序
			"current": 2,
			"list": [
				{
					"id": -1,
					"name": "scene",
					"pathName": "pages/index/index",
					"query": "scene=12345678",
					"scene": "1047"
				}
			]
		}
	}
}
```

### 3.附加 sitemap 配置

sitemap.json 文件用于配置小程序及其页面是否允许被微信索引（爬虫），如果没有 sitemap.json ，则默认为所有页面都允许被索引

完整 https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/sitemap.html

```json
{
  "rules": [{
      "action": "allow",
      "page": "*"   // 所有页面
  }]
}
```

### 4.独立页面配置 *_page.json

独立定义每个页面的属性，如顶部颜色、是否下拉刷新等

完整 https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/page.html

```json
{
  "navigationBarBackgroundColor": "#ffffff",
  "navigationBarTextStyle": "black",
  "navigationBarTitleText": "加载中...",
  "backgroundColor": "#eeeeee",
  "backgroundTextStyle": "light"
}
```

区分：
- 1.wxml 和 html： 标签不同，属性不同，模版语法不同
- 2.wxss：新增rpx尺寸单位，新增全局和局部样式，wxss仅支持部分css选择器
- 3.小程序的js分三大类：app.js是整个入口文件，调用App()函数来启动； 页面js调用Page()函数来创建页面； 普通js封装公共的函数或属性

## 二. 小程序宿主环境

WXML模板和WXSS样式工作在渲染层，JS脚本在逻辑层

渲染层（采用WebView渲染）+ 逻辑层(采用JsCore线程运行JS脚本）

### 1.运行小程序页面的一个流程
1) 通过 app.json 的 pages 字段，查找第一个页面
```json
{
  "pages":[
    "pages/index/index",
    "pages/logs/logs"
  ]
}
```

2) app.js 定义的 App 实例的 onLaunch 回调会被执行:
```js
App({
  onLaunch: function () {
    // 小程序启动之后 触发
  }
})
```
3) 来到具体页page，先根据 logs.json 配置生成一个界面，紧接着客户端就会装载这个页面的 WXML 结构和 WXSS 样式。最后客户端会装载 logs.js
```js
Page({
  data: { // 参与页面渲染的数据
    logs: []
  },
  onLoad: function () {
    // 页面渲染后 执行
  }
})
```

## 三. 小程序更新机制

**未启动时更新**

微信客户端会有若干个时机去检查本地缓存的小程序有没有更新版本，如果有则会静默更新到新版本。非实时更新

**启动时更新**

小程序每次冷启动时，都会检查是否有更新版本

1. wx.getUpdateManager API，需要马上应用最新版本

```js
const updateManager = wx.getUpdateManager()

updateManager.onCheckForUpdate(function (res) {
  // 请求完新版本信息的回调
  console.log(res.hasUpdate)
})

updateManager.onUpdateReady(function () {
  wx.showModal({
    title: '更新提示',
    content: '新版本已经准备好，是否重启应用？',
    success(res) {
      if (res.confirm) {
        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
        updateManager.applyUpdate()
      }
    }
  })
})

updateManager.onUpdateFailed(function () {
  // 新版本下载失败
})
```

2. wx.getSystemInfoSync()  获取系统信息

```js
system	string	操作系统及版本  
```

可以判断微信的版本以及当前手机的系统版本，是否较低

## 四.小程序实战

### 1. 视图层(组件) wxml

页面的组件类似于标签一样:

组件详见，https://developers.weixin.qq.com/miniprogram/dev/component/

```html
<view class="btn-area">
  <view class="body-view">
    <map bindmarkertap="markertap" longitude="广州经度" latitude="广州纬度"></map>
    <text>{{text}}</text>
    <button bindtap="add">add line</button>
    <button bindtap="remove">remove line</button>
  </view>
</view>
```

```html
<view wx:for="{{array}}">
  {{index}}: {{item.message}}
</view>
<view wx:if="{{condition}}"> True </view>
<view hidden="{{flag ? true : false}}"> Hidden </view>
```

### 2. 逻辑层(框架) js

注册小程序中的一个页面。接受一个 Object 类型参数，其指定页面的初始数据、生命周期回调、事件处理函数等。

框架详见，https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html

1. 生命周期回调
```js
//index.js
Page({
  data: {
    text: "This is page data."
  },
  onLoad: function(options) {
    // 页面加载时触发
  },
  onShow: function() {
    // 页面显示/切入前台时触发
  },
  onReady: function() {
    // 初次渲染完成
  },
  onHide: function() {
    // 页面隐藏/切入后台时触发
  },
  onUnload: function() {
    // 页面卸载时触发
  },
  onPullDownRefresh: function() {
    // 监听用户下拉刷新事件
  },
  onReachBottom: function() {
    // 监听用户上拉触底事件
  },
  onShareAppMessage: function () {
    // 监听用户点击转发按钮
  },
  onPageScroll: function() {
    // 监听用户滑动
  },
  onResize: function() {
    // 小程序屏幕旋转时触发
  }
})
```

2.事件处理函数，改变数据的方式
```js
// index.js
Page({
  data: {
    text: 'init data',
    num: 0
  },
  changeText: function() {
    // 修改数据使用 setData
    this.setData({
      text: 'changed data'
    })
  }
})
```

1) setData 函数用于将数据从逻辑层发送到视图层（异步），同时改变对应的 this.data 的值（同步）。
2) 详见https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html

### 3. 路由

- wx.reLaunch - 可以打开任意页面（重启动）
- wx.navigateTo - 打开新页面（保留记录）
- wx.navigateBack - 用户按左上角返回按钮或其他按钮（页面返回）
- wx.switchTab - 只能打开tabBar页面（Tab 切换）
- wx.redirectTo - 打开页面，除了tabBar页（页面重定向）

页面底部的 tabBar 由页面决定，即只要是定义为 tabBar 的页面，底部都有 tabBar。

```js
wx.reLaunch({ 
    url: `/pages/view/view?url=openId` 
})
wx.navigateBack({
    url: '/pages/index/index'
})
```

### 4. 开放能力

用户信息， 转发， 消息， 授权, 拉起APP，卡券等

https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html

#### 1.小程序登录

小程序可以通过微信官方提供的登录能力方便地获取微信提供的用户身份标识，快速建立小程序内的用户体系。

- 调用 wx.login() 获取 临时登录凭证code ，并回传到开发者服务器。
- 调用 auth.code2Session 接口，换取 用户唯一标识 OpenID 和 会话密钥 session_key。
- 之后开发者服务器可以根据用户标识来生成自定义登录态，用于后续业务逻辑中前后端交互时识别用户身份。

#### 2.授权 (如地理位置)

开发者可以使用 wx.authorize 在调用需授权 API 之前，提前向用户发起授权请求。
```js
// 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.userLocation" 这个 scope用户位置
wx.getSetting({
  success(res) {
    if (!res.authSetting['scope.userLocation']) {
      wx.authorize({
        scope: 'scope.userLocation',
        success () {
          // 用户已经同意
          ...
        },
        fail () {
          // 询问是否开启
          ...
        },

      })
    }
  }
})
```

#### 3.设备信息

获取设备系统信息 wx.getSystemInfoSync
```js
try {
  const res = wx.getSystemInfoSync()
  console.log(res.model)
  console.log(res.pixelRatio)
  console.log(res.windowWidth)
  console.log(res.platform)
  console.log(res.environment)
} catch (e) {
  // Do something when catch error
}
```

## 其他：微信公众号接SDK

参见官网 - 微信JS-SDK说明文档

https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#63

使用场景：
- 微信为了安全考虑，想要调用，必须注册成为开发者，
- 而且有一套签名验证流程，只有通过这些验证，才能成功调用SDK里的方法。

**JSSDK使用步骤**

### 1.绑定域名

公众号设置”的“功能设置”里填写“JS接口安全域名”。

### 2.引入JS文件

http://res.wx.qq.com/open/js/jweixin-1.4.0.js

### 3.通过config接口注入权限验证配置

jssdk的签名权限,这个权限是由后台提供的,前端只需要把签名权限注入到wx.config中就可以了

后台生成签名, 分为3步；
- 1：使用之前拿到的 appId和appsecre t向微信获取全局唯一票据access_token（获取就可以了）
- 2：使用access_token获取api_ticket（此调用次数受限，需缓存到服务器）
- 3：根据api_ticket和js接口安全域名（访问url） 一起生成签名，再返回给前端：

### 4.通过ready接口处理成功验证

### 5.通过error接口处理失败验证

```js
wx.config({
  debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，
  参数信息会通过log打出，仅在pc端时才会打印。
  appId: '', // 必填，公众号的唯一标识
  timestamp: , // 必填，生成签名的时间戳
  nonceStr: '', // 必填，生成签名的随机串
  signature: '',// 必填，签名
  jsApiList: [] // 必填，需要使用的JS接口列表
});

wx.ready(function(){
  // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，
  所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。
  对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
});

wx.error(function(res){
  // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，
  也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
});
```

注意点：

1. 这里需要注意的地方debug在上线后要改为false,

2. jsApiList里要填你要使用的接口,不然没有作用

如常用图像接口： ['chooseImage', 'uploadImage', 'downloadImage', 'getLocalImgData']等
