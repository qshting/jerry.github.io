---
title: 知识概述
---

## 1.flex布局
CSS3 弹性盒（ Flexible Box 或 flexbox），是一种当页面需要适应不同的屏幕大小以及设备类型时确保元素拥有恰当的行为的布局方式。

引入弹性盒布局模型的目的：是提供一种更加有效的方式让子元素进行排列、对齐和分配空白空间。
- 弹性盒子由弹性容器(Flex container)和弹性子元素(Flex item)组成。
- 弹性容器通过设置 display 属性的值为 flex 或 inline-flex将其定义为弹性容器。
- flex下的子元素必须为块级元素
- 设为Flex布局以后，子元素的float、clear和vertical-align属性将失效。

### flex容器属性
- 1.flex-direction: 指定了弹性容器中子元素的排列方向
- 2.justify-content:设置弹性盒子元素在主轴（横轴）方向上的对齐方式。
- 3.align-items:设置弹性盒子元素在侧轴（纵轴）方向上的对齐方式。
- 4.flex-wrap: 设置弹性盒子的子元素超出父容器时是否换行。
- 5.align-content: 定义了在交叉轴方向的对齐方式及额外空间分配

### flex项目属性(子级)
- 1.order: 定义项目在容器中的先后顺序
- 2.flex-grow: 定义项目的放大比例,默认为0
- 3.flex-shrink: 定义了项目的缩小比例,默认为1
- 4.flex-basis: 定义项目在分配额外空间之前的缺省尺寸(默认值为auto，即 项目原本大小)
- 5.flex: 以上3个属性简写，默认0 1 auto 
- 6.align-self: 定义项目的对齐方式

## 2.flex案例
1、等高布局
```css
.item {width: 400px;height: 300px;display: flex;}
.item div {width: 100px;background: pink;}
```

2、菜单固定，右侧自适应
```css
.container {display: flex;width: 100%;height: 100vh;background: skyblue;}
.left-tree {width: 200px;height: 100%;background: pink;}
.main {flex: 1 1 auto;}
```

3、一屏页面
```css
.container {display: flex;flex-direction: column;width: 100%;height: 100vh;}
.header {width: 100%;height: 60px;background: pink;}
.footer {width: 100%;height: 60px;background: pink;}
.main {flex: 1; background: skyblue;}
```

## 3.flex:1解惑
flex属性的默认值为：0 1 auto （不放大会缩小）

flex: 1 1 auto  （放大且缩小）

flex: 1 (解析为：1 1 0%)，常用作自适应布局


## 动画分享
1. [Animista 在线生成 css 动画](https://animista.net/play/background/bg-pan/bg-pan-top)
2. [css3动画大全](https://www.webhek.com/post/css3-animation-sniplet-collection.html#/)
3. [css hover滑过效果](https://ianlunn.github.io/Hover/)

