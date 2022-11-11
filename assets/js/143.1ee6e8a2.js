(window.webpackJsonp=window.webpackJsonp||[]).push([[143],{667:function(t,a,r){"use strict";r.r(a);var _=r(60),v=Object(_.a)({},(function(){var t=this,a=t.$createElement,r=t._self._c||a;return r("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[r("h2",{attrs:{id:"cpu"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#cpu"}},[t._v("#")]),t._v(" CPU")]),t._v(" "),r("p",[t._v("CPU是计算机的核心，它承担了所有的计算任务。它就像一座工厂，时刻在运行。")]),t._v(" "),r("h2",{attrs:{id:"进程"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#进程"}},[t._v("#")]),t._v(" 进程")]),t._v(" "),r("p",[t._v("假定工厂的电力有限，一次只能供给一个车间使用。也就是说，一个车间开工的时候，其他车间都必须停工。背后的含义就是，单个CPU一次只能运行一个任务。")]),t._v(" "),r("p",[t._v("进程就好比工厂的车间，它代表CPU所能处理的单个任务。进程之间相互独立，任一时刻，CPU总是运行一个进程，其他进程处于非运行状态。CPU使用时间片轮转进度算法来实现同时运行多个进程。")]),t._v(" "),r("h2",{attrs:{id:"线程"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#线程"}},[t._v("#")]),t._v(" 线程")]),t._v(" "),r("p",[t._v("一个车间里，可以有很多工人，共享车间所有的资源，他们协同完成一个任务。")]),t._v(" "),r("p",[t._v("线程就好比车间里的工人，一个进程可以包括多个线程，多个线程共享进程资源。")]),t._v(" "),r("h3",{attrs:{id:"单线程"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#单线程"}},[t._v("#")]),t._v(" 单线程")]),t._v(" "),r("p",[t._v("所谓单线程就是：一个进程只开一个线程。")]),t._v(" "),r("h2",{attrs:{id:"cpu、进程、线程之间的关系"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#cpu、进程、线程之间的关系"}},[t._v("#")]),t._v(" CPU、进程、线程之间的关系")]),t._v(" "),r("p",[t._v("从上文我们已经简单了解了CPU、进程、线程，简单汇总一下。")]),t._v(" "),r("ol",[r("li",[t._v("进程是cpu资源分配的最小单位（是能拥有资源和独立运行的最小单位）。")]),t._v(" "),r("li",[t._v("线程是cpu调度的最小单位（线程是建立在进程的基础上的一次程序运行单位，一个进程中可以有多个线程）。")]),t._v(" "),r("li",[t._v("线程是隶属于进程的，被包含于进程之中，"),r("strong",[t._v("一个线程只能隶属于一个进程，但是一个进程是可以拥有多个线程的")]),t._v("。")]),t._v(" "),r("li",[t._v("不同进程之间也可以通信，不过代价较大。")]),t._v(" "),r("li",[t._v("单线程与多线程，都是指在一个进程内的单和多。")])]),t._v(" "),r("h2",{attrs:{id:"浏览器是多进程的"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#浏览器是多进程的"}},[t._v("#")]),t._v(" 浏览器是多进程的")]),t._v(" "),r("p",[t._v("我们已经知道了CPU、进程、线程之间的关系，对于计算机来说，每一个应用程序都是一个进程，而每一个应用程序都会分别有很多的功能模块，这些功能模块实际上是通过子进程来实现的。对于这种子进程的扩展方式，我们可以称这个应用程序是多进程的。")]),t._v(" "),r("p",[t._v("而我们常用的Chrome浏览器就是多进程的，比如说在Chrome浏览器中打开了多个tab页面，每一个tab页面就是一个独立的进程。")]),t._v(" "),r("h2",{attrs:{id:"浏览器包含哪些进程"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#浏览器包含哪些进程"}},[t._v("#")]),t._v(" 浏览器包含哪些进程")]),t._v(" "),r("p",[t._v("主进程")]),t._v(" "),r("p",[t._v("协调控制其他子进程（创建、销毁）\n浏览器界面显示，用户交互，前进、后退、收藏\n将渲染进程得到的内存中的Bitmap，绘制到用户界面上\n处理不可见操作，网络请求，文件访问等")]),t._v(" "),r("p",[t._v("第三方插件进程")]),t._v(" "),r("p",[t._v("每种类型的插件对应一个进程，仅当使用该插件时才创建")]),t._v(" "),r("p",[t._v("GPU进程")]),t._v(" "),r("p",[t._v("用于3D绘制等")]),t._v(" "),r("p",[t._v("渲染进程，就是我们说的浏览器内核")]),t._v(" "),r("p",[t._v("负责页面渲染，脚本执行，事件处理等\n每个tab页一个渲染进程")]),t._v(" "),r("p",[t._v("那么浏览器中包含了这么多的进程，那么对于普通的前端操作来说，最重要的是什么呢？\n答案是渲染进程，也就是我们常说的浏览器内核")]),t._v(" "),r("h2",{attrs:{id:"浏览器内核-渲染进程"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#浏览器内核-渲染进程"}},[t._v("#")]),t._v(" 浏览器内核（渲染进程）")]),t._v(" "),r("h2",{attrs:{id:"参考文档"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#参考文档"}},[t._v("#")]),t._v(" 参考文档")]),t._v(" "),r("ol",[r("li",[r("a",{attrs:{href:"https://juejin.im/post/5d5b4c2df265da03dd3d73e5",target:"_blank",rel:"noopener noreferrer"}},[t._v("从多线程到Event Loop全面梳理"),r("OutboundLink")],1)]),t._v(" "),r("li",[r("a",{attrs:{href:"https://juejin.im/post/5d43017be51d4561f40adcf9",target:"_blank",rel:"noopener noreferrer"}},[t._v("深入理解Node.js 中的进程与线程"),r("OutboundLink")],1)]),t._v(" "),r("li",[r("a",{attrs:{href:"https://juejin.im/post/5e22b391f265da3e204d8c14",target:"_blank",rel:"noopener noreferrer"}},[t._v("「硬核JS」一次搞懂JS运行机制"),r("OutboundLink")],1)])])])}),[],!1,null,null,null);a.default=v.exports}}]);