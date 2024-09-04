---
title: 三、开放知识
---

## 01. 小程序更新机制

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

## 02. 开放能力

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