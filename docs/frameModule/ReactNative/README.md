---
title: App知识概述
---

## 一.环境搭建
1. [完整配置版](https://www.jianshu.com/p/3f4c3e2e791b)
2. [RN开发填坑之旅](https://www.jianshu.com/p/9bfafd07cf9a )
3. [给所有开发者的React Native详细入门指南 ](https://www.jianshu.com/p/fa0874be0827)
4. [React Native Android混合开发](https://www.jianshu.com/p/a559fd6bc39b)
5. [下载并安装Android studio-需翻墙](https://developer.android.com/studio/index.html)
6. [中文站](https://developer.android.google.cn/studio)

### 1.安装依赖

必须安装的依赖有：Node、Python2、JDK 和 Android Studio。

Node 的版本应大于等于 12，Python 的版本必须为 2.x（不支持 3.x），而 JDK 的版本必须是 1.8

Yarn是 Facebook 提供的替代 npm 的工具，可以加速 node 模块的下载。

- 1. 下载JDK1.8 和 Android studio（JDK需要配置2个环境变量）
- 2. 安装SDK，安卓模拟器


### 2.项目启动

1. 开始搭建
```js
//react-native脚手架工具
npm install -g yarn react-native-cli

//搭建myApp项目
react-native init myApp
```

2. 启动项目
```js
react-native run-android
```

## 二.RN项目

### 1.操作手册
**Android项目启动**
- 执行命令 yarn or yarn install 初始化项目
- 当提示包不存在或者出现link字样时，提示npm包需要建立link连接，执行命令npx react-native link packageName（需要建立依赖的包名）
- 在android studio中打开虚拟模拟器，执行命令npx react-native run-android启动项目，windows + m为调试快捷键
- 如果需要真机调试，需要usb连接电脑，并打开手机开发者模式，执行启动命令即可


**ios项目启动**
- 执行命令 yarn or yarn install 初始化项目；
- 当出现编译错误，并包含link字样时，提示npm包需要建立link连接，执行命令npx react-native link packageName（需要建立依赖的包名）；
- 终端中输入cd ios，进入ios目录，紧接着执行命令pod install 建立ios链接；
- 添加新链接时，需要重新执行pod install命令，依赖版本不一致导致编译错误时，删除podfile.lock、.xcworkspace文件，重新进入ios目录并执行pod

**install命令**
- mac终端执行npx react-native run-ios命令，自启动simulator模拟器，启动项目，可使用快捷键command+d进行项目调试； 
- 真机调试时，需要选择开发团队和与真机相同的ios版本进行打包调试；


### 2.JS与Native通信的几种方式

1.	React Native -> Web: The injectedJavaScript prop
    [只在webview初次加载时执行]

```js
const runFirst = `
      document.body.style.backgroundColor = 'red';
      …others
      true; // 必填参数
`;

<WebView
  source={{
    uri: ' https://www.baidu.com',
  }}
  injectedJavaScript={runFirst}
/>;

```

2.	React Native -> Web: The injectJavaScript method
    [任何时间段都可执行]

```js
const run = `
        document.body.style.backgroundColor = 'blue';
        true;
      `;
  
  setTimeout(() => {
       this.webref.injectJavaScript(run);
  }, 3000);
```

3.	Web -> React Native: The postMessage method and onMessage prop

```js
// js端
// jsontest必须是string类型
window.ReactNativeWebView.postMessage(jsontext) 

// native端
<WebView
     source={{ uri }}
     onMessage={event => {
        alert(event.nativeEvent.data);
     }}
/>
```


### 3.JS与Native通信约定

**1.js与native的通讯方法** 全部暴露在Mutual对象之下，使用时引入此包，并挂载至window全局对象之上，以便全局监听使用。

所有JsCallNative方法声明为Mutual实例方法，直接通过Mutual.methodName调用，NativeCallJs方法则声明在NativeCallJs.js中，方便统一管理。
```js
// Js和native之间数据传递格式统一如下：
{
      methodName: 'methodName’,
      params: {
        arg1: arg1,
			  others  …
      }
 }
```
参数说明： @methodName 必填 需调用方法；@params 可选 需传递的参数集合；

**2.JsCallNative**

!!!所有数据传递前必须转成JSON字符串，只接受string类型的参数。

**3. NativeCallJs**

参数格式统一为Object类型

**4.Mutual常用方法说明如下：**

jsCallNative：
提供js调用native的方法，常用方法建议使用此方法封装在Mutual内部，便于维护；

nativeCallJs：
提供native调用的js方法；

jsCallNativeCallback：
native主动调起js的回调函数，用于传递数据到js端；

getJosntest：
提供js调用native的回调函数，用于从native拿到需要的返参；

**5. （以获取设备信息为例）使用方法参照如下**：
```js
// js端
import Mutual from 'common/js/Mutual' 
window.Mutual = Mutual
Mutual.getAppInfo()
Mutual.getJsontext = function(envInfo){
    vm.$toast(envInfo.params. terminalName)
}
```



```js
// Native端：
handleOnMessage = event => {
    // 接收的json字符串，转成json对象
    let data = JSON.parse(event.nativeEvent.data);

    switch (data.methodName) { // 匹配方法名
      case 'getAppInfo':
        const run = `
          let envInfo = {
            params:{
              terminalType: 'App', 
              terminalName: '${Platform.OS}', // 终端类型              
              terminalVersion: '${Platform.Version}' // 终端版本
            }
          };
          // 主动发起回调，将数据传递到js
          Mutual.jsCallNativeCallback(envInfo)
          true;
        `;
        this.webview.injectJavaScript(run);
        break;
    }
```

## 参考文档

1. [React-Native从零搭建App（长文）](https://juejin.im/post/5a9f93d96fb9a028d2077c19#heading-7)
2. [React-Native搭建App 完整项目架构](https://github.com/amandakelake/ReactNativeNavigationDemo)
3. [30天RN demos](https://github.com/fangwei716/30-days-of-react-native)
4. [仿开眼RN（30%）](https://github.com/MarnoDev/react-native-eyepetizer/tree/master/ios)
5. [分享 50 个完整的 React Native 项目](https://juejin.im/post/58f37cb361ff4b0058f9824a)
6. [RN博客推荐](https://juejin.im/user/56c1c513c24aa800534e85f3/posts)
7. [安装翻墙--木马 Trojan-Qt5-Windows.zip](https://github.com/Trojan-Qt5/Trojan-Qt5/releases)










