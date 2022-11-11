---
title: 知识概述
---

## 1.let和const

var的缺陷：允许重复命名，存在变量提升，没有给变量赋值时默认为undefined

**let特性**：
- 1、不允许重复命名
- 2、不存在变量提升
- 3、块级作用域 暂存死区（从块的开始到声明这段的区域）


**const特性**：

同let，声明一个只读的常量。（一旦声明，常量的值就不能改变）

**关于作用域**：

var的变量由函数划分作用域

let的变量由代码块划分作用域


```js
 for (var i =0; i<3; i++){
    document.addEventListener('click',function () {
      console.log(i);   //3,3,3
    },false)

  }
```

可以不需要闭包，就可以解决正常显示。
```js
 for (let i =0; i<3; i++){
    document.addEventListener('click',function () {
      console.log(i);   //0,1,2
    },false)

  }
```

## 2.箭头函数和模板字符串

**箭头函数**
- 隐式返回，省略return关键字
- 继承当前上下文的 this 关键字
- 不可以使用arguments对象
- 不推荐场景（构造函数 / 一个对象的方法 / 给原型绑定方法）

```js
//没有参数
() => {函数声明}

//一个参数
单一参数 => {函数声明}

//多个参数
(参数1, 参数2, …, 参数N) => { 函数声明 }

const double2 = arr.map((number) => number*2)
```

**模板字符串**: 是增强版的字符串，用反引号（`）标识；在占位符 ${} 中写入表达式

```js
let string01 = `User ${user.name} is not authorized to do ${user.age}.`
```

## 3.剩余参数运算符

用 ... 表示, 主要是打包剩余。 在集合中最后一个成员前添加(将剩余变量打包为一个新的集合)
```js
// 01- 数组解构下（会打包为数组）
let [zero, , ...rest] = arr

// 02- 对象解构下（会打包为新对象）
let {zero, ...rest} = obj

// 03- 参数列表下使用 （会打包为数组）
function sum(...numbers) {
    console.log(numbers);
    return numbers.reduce((prev,curr) => prev + curr,0)
}
```

## 4.扩展运算符

用 ... 表示, 主要起到分散的作用。（把一个可遍历对象转为一个用逗号分隔的新的参数序列）

- 可以用来克隆数组(或对象)
- 可以用来连接数组(或对象，形成新的参数序列)
- 可以在方法中使用

```js
// (相当于深拷贝)newArr复制了arr1的元素，修改时互不影响
let arr1 = ['mary','mark','bob','lily'];
let newArr = [...arr1]; 

// 合并数组
let newArr1 = [...arr1,...arr2];
let newArr2 = [...arr1,'separate',...arr2];

// 方法中使用
let fruits = ['banana','apple','orange'];
let newFruits = ['peach','pear'];
fruits.push(...newFruits);
```

## 5.解构赋值

通过解构赋值, 可以将属性/值从对象或数组中取出, 赋值给其他变量

**1)解构数组**

可以预留位置，可以设置默认值，可以使用剩余参数
```js
let arr = [1,2,3,4]
let [a,b,c] = [1,2,3]   // 等效于单独赋值

let [a,,,b] = [1,2,3,4]
let [a,b,c=100] = [1,2];
let [a, ...b] = [1, 3, 5];
```

**2)解构对象**

数组的解构，元素是按次序排列的。而对象的结构是，变量必须与属性同名,
```js
let obj = {
   name: 'ghk',
   age: 22,
   gender: 'male'
};

let {name,gender} = obj;
```

**3)常用**

```js
// 01 - 交换变量的值
[x, y] = [y, x]

// 02 - 函数参数的定义(匹配)
function f([x, y, z]) { ... }
f([1, 2, 3])

// 03 - 提取JSON数据
let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};

let { id, status, data } = jsonData;

// 04 - 函数参数的默认值
// 指定参数的默认值,避免了在函数体内部写判断
var foo = config.foo || 'upfoo'

// 05 - 输入模块的指定方法（解构赋值使得输入语句非常清晰。）
const { SourceMapConsumer, SourceNode } = require("source-map")
```

补充. 配合扩展运算符，可以取对象的区间值，类似数组的slice()函数
```js
const {name, age, ...exts} = item;
let newItem = {
    ...exts,
    name: 'jer'
    }
```

## 6.Set 和 Map

ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。
Set 本身是一个构造函数，用来生成 Set 数据结构。

```
01- 数组去重
先去重，再用结构赋值，转换为数组格式
let array = [1,2,3,3,3,5]
let nArray = [...new Set(array)]  // [1,2,3,5]
```

```
02- 实现并集、交集和差集
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
console.log(...union)

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
console.log(...intersect)

// 差集
let difference = new Set([...union].filter(x => !intersect.has(x)));
console.log(...difference)

```

## 7.Async/Await


```
1.async函数返回一个 Promise 对象
2.async函数的return返回值，会成为then回调的参数
3.async函数内部抛出错误，会返回reject状态。被catch方法接收(await最好放在try...catch代码块中)
```


```
async function myFunction() {
      try {
        await somethingThatReturnsAPromise()
      } catch (err) {
        console.log(err)
      }
}

myFunction().then(function(data){
    console.log(data); 
})
```

多个await命令，可同时触发
```
// 写法一
let [foo, bar] = await Promise.all([getFoo(), getBar()])

// 写法二
let fooPromise = getFoo()
let barPromise = getBar()
let foo = await fooPromise
let bar = await barPromise
```

## 8.类和对象

1）传统方式，通过构造函数定义一个类

2）ES6引入了Class，作为对象的模板
```
class Person{
    constructor(myName, myAge){
        this.name = myName;
        this.age = myAge;
    }
    // 定义实例方法
    say(){
        console.log(this.name, this.age);
    }
    // 定义静态方法
    static run() {
        console.log("run");
    }
}
let p = new Person("zs", 18); //创建一个Person实例
p.say();      //调用实例方法
Person.run(); //调用静态方法
```

```
01- constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。
一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。
 
02- 类里面定义方法
static关键字表示定义静态方法，实例方法写在constructor外面，默认是添加到原型上面的
```


## 9.Iterator（遍历器
## 10.Reflect对象
## 11.Symbol属性
## 12.Generator生成器
## 13.Promise 对象

## 14.Module模块系统

- 1. AMD 和 CMD(require.js遵循AMD规范，SeaJS遵循CMD规范)
- 2. CommonJS: 是服务端模块的规范，NodeJS采用了这个规范。 CommonJS规范同步加载模块，也就是：只有加载完成，才能执行后面的操作。
- 3. ES6模块化：import和export

**模块将代码分割为可重用的单元，模块中的（类、方法、变量）可以供外部使用，或只在模块内使用。**

(1) ES6模块化的导入和导出
```js
export let a = 1  // 单独导出
export { b, c }   // 批量导出 

export interface P {     // 导出接口 
     x: number;
 }
export function fn() {}  // 导出函数 
 
// 导出时起别名
export { fn as G }

// 引入外部模块，再重新导出 
export { str as hello } from './b'

// 默认导出，无需函数名 
export default function () {
    console.log("I'm default")
} 
```

```js
import { a, b, c } from './a'; // 批量导入 
import { P } from './a';       // 导入接口 
import { f as F } from './a';  // 导入时起别名 
import * as All from './a';    // 导入模块中的所有成员，绑定在 All 上 
import myFunction from './a';  // 不加{}，导入默认
```

(2) commonjs导入和导出(node环境下)
```js
// 整体导出 
let a = {
    // ...
} 
module.exports = a 
```

```js
// 导出多个变量 
exports === module.exports 
module.exports = {} 
exports.c = 3 
exports.d = 4 
```

```js
// 导入 
let c1 = require('./a.node') 
let c2 = require('./b.node') 
let c3 = require('../es6/a') 
import c4 = require('../es6/d')
```

## 15.ES6语法扩展
### 1)字符串扩展
- includes()：  返回布尔值，是否找到了参数字符串
- startsWith()：返回布尔值，参数字符串是否在原字符串的头部
- endsWith()：  返回布尔值，参数字符串是否在原字符串的尾部

### 2)数组扩展
- Array.from(): 用于将两类对象转为真正的数组
- Array.of(): 用于将一组值，转换为数组
- arr.includes():  返回一个布尔值，表示某个数组是否包含给定的值
- arr.find():      用于找出第一个符合条件的数组成员, 并返回该成员(否则返回undefined)
- arr.findIndex(): 返回第一个符合条件的数组成员的位置，否则返回-1

### 3)对象扩展

```js
// 属性的简写
// 方法的简写
const obj = {
  name,
  age,
  getName(){
    console.log(this.name);
  }
};
```
- Object.is():      比较两个值是否严格相等
- Object.assign():  用于对象的合并
- Object.keys()：   返回一个数组，可遍历属性的键名
- Object.values()： 返回一个数组，可遍历属性的键值
- Obj.hasOwnProperty(obj.prop): 返回一个布尔值，是否具有指定的属性

```js
let obj = { foo: 'bar', baz: 42 }
Object.keys(obj)             // ["foo", "baz"]
Object.values(obj)           // ["bar", 42]
obj.hasOwnProperty('foo')    //true
```

