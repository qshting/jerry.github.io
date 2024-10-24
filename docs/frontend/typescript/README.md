---
title: 一、基础知识
---

初体验：安装和运行ts
```bash
npm install -g typescript
tsc -v 
tsc helloworld.ts
```

**类型小知识：**

- 类型：不同类型变量占据的内存大小不同，和可以对它可做的操作不同，
- 1.类型安全：保证对什么类型只做什么操作
- 2.类型检查：而保证类型安全的方式就是类型检查。

动态类型与静态类型:

- 1.动态类型检查：执行期做类型检查；写代码很灵活
- 2.静态类型检查：编译期做类型检查；则是在源码中保留类型信息

升级版类型系统：
- 1.简单类型系统：变量、函数、类等都可以声明类型
- 2.支持泛型的类型系统：(也叫类型参数,可以代表任何一种类型)会变化的类型声明，在调用的时候再确定类型
- 3.支持类型编程的类型系统：对传入的类型参数(泛型)做各种逻辑运算，产生新的类型，这就是类型编程

```js
// 例：类型运算
function getpropValue<T extends object,Key extends keyof T>(obj:T, key:Key):T[Key]{
    return obj[key]
}
```

## 一.常用类型

:[name]  类型注解, 就是类型声明（作用：为变量添加类型约束）

- 原始类型：number/string/boolean/null/undefined/symbol
- 对象类型：object（包括，数组、对象、函数等对象）
- 新增类型: 联合类型、自定义类型（类型别名）、接口、元组、字面量类型、枚举、void、any 等

### 1.基础类型
```js
// 原始类型
let count: number = 10
let name: string = 'smile'
let isDone: boolean = false
let val: null = null

// symbol - 具有唯一的值
let s1: symbol = Symbol()
let s2 = Symbol()
console.log(s1 === s2) //error
```
**(1)any | unknow**

**any 类型:** 全局超级类型

**unknow 类型:** 对any类型的补充，
unknow 类型只能被赋值给 any 类型和 unknow 类型本身，当中间类型赋值变化时，会error
unknow 是不能调用属性和方法

**(2)void | undefined | null**
```js
// void 空值类型
// 表示没有任何返回值的函数
// 主要是用在我们不希望调用者关心函数返回值的情况下，比如通常的异步回调函数
function warnUser(): void {
    console.log("message")
}

// undefined, null
// 是任何类型的子类型
// null是表示一个空对象引用； 一个没有值的变量会返回 undefined
let un: undefined = undefined
let nu: null = null
num = undefined
num = null
```

**(3)never** 不应该存在的状态
```js
// never
永远不会有返回值的类型

let error = () => {
    throw new Error('error')
}
let endless = () => {
    while(true) {}
}
使用 never 避免出现新增了联合类型没有对应的实现，目的就是写出类型绝对安全的代码。
```

### 2.数组类型

对象类型：object（包括，数组、对象、函数等对象）

```js
//写法1：类型加[]
let arr1: string[] = ["1", "2"]; //字符串类型的数组
let arr2: number[] = [1, 2, 3];  //数字类型的数组
let arr3: any[] = [1, "2", true]; //任意类型的数组
let arr4: (string | number | boolean)[] = [1, '2', true]


//写法2：Array<类型>
let arr01: Array<number> = [1, 2]       // 泛型语法
let arr02: Array<number | string> = [1, 2, '4']  
```

```js
// 用接口表示数组
interface NumberArray {
    [index: number]: number
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5]

// 类数组(:IArguments 是内置对象定义的)
function Arr(...args:any): void {
    console.log(arguments)
    let arr:IArguments = arguments
}
Arr(111, 222, 333)
```

元组（Tuple）

一种特殊的数组,它限定了元素的类型和个数
```js
如果一个方法需要返回多个值，可以把这多个值作为元组返回，而不需要创建额外的类来表示
let tuple: [number, string] = [0, '1']
let tuple: [number, string] = ['good', '1']  //error
```


### 3.对象类型和接口

当一个对象类型被多次使用时，一般会使用接口（interface）来描述对象的类型，达到复用的目的。

1. 使用 interface 关键字来声明接口。
2. 接口名称（比如，此处的 IPerson），可以是任意合法的变量名称。
3. 声明接口后，直接使用接口名称作为变量的类型。
4. 因为每一行只有一个属性类型，因此，属性类型后没有 ;（分号）

```js
interface Person {
    name: string,
    age?: number,
    readonly school: string,
    [propName: string]: any;
    cb():void
}
 
const person: Person = {
    name: 'jerry',
    age: 9,
    school: "开心学校",
    c: "123",
    cb:()=>{
        console.log(123)
    }
}
```

使用 extends（继承）关键字实现了接口继承
```js
interface Point2D {
  x: number
  y: number
}

// 使用 继承 实现复用：
interface Point3D extends Point2D {
  z: number
}
```

interface（接口）和 type（类型别名）的对比：
- 相同点：都可以给对象指定类型。
- 不同点：接口，只能为对象指定类型； 类型别名可以为任意类型指定别名
- type 能使用in关键字生成映射类型，但 interface 不行



### 4.函数类型

函数的类型实际上指的是：函数参数和返回值的类型。\
为函数指定类型的两种方式：1 单独指定参数、返回值的类型 2 同时指定参数、返回值的类型。

```js
// 1. 单独指定参数、返回值类型：
function add(num1: number, num2: number): number {
  return num1 + num2
}

const add = (num1: number, num2: number): number => {
  return num1 + num2
}
console.log(add(3, 2))


// 2. 同时指定参数、返回值类型：
const add: (num1: number, num2: number) => number = (num1, num2) => {
  return num1 + num2
}

// 3.使用type定义一个别名（推荐最佳）
type AddFn = (num1: number, num2: number) => number
const add02: AddFn = (num1, num2) => {
  return num1 + num2
}
```

```js
// 函数没有返回值 ：void
function greet(name: string): void {
  console.log('Hello', name)
}

// 函数是可选参数 ?
function mySlice(start: number, end?: number): void {
  console.log('起始索引：', start, '结束索引：', end)
}

// 可优化
type greetfn = (name: string) => void;
const greet: greetfn = (name) => {
  console.log('Hello', name);
};
type mySlicefn = (start: number, end?: number) => void;
const mySlice: mySlicefn = (start, end) => {
  console.log('起始索引：', start, '结束索引：', end);
};

```

### 5.枚举类型

解决的问题:  1)可读性差,很难记住数字的含义;  2)可维护差,牵一发动全身

枚举 - 一组有名字的常量集合

```js
// 01 - 数字枚举
enum Role {
    Reporter = 1,
    Owner,
    Guest
}
// 默认就是从0开始的，可以初始化为 1
console.log(Role.Reporter)
console.log(Role)


// 02 - 字符串枚举
enum Message {
    Success = '成功了',
    Fail = '失败了'
}

// 03 - 常量枚举
const enum Month {
    Jan,
    Feb,
    Mar,
    Apr = Month.Mar + 1,
    // May = () => 5
}
let month = [Month.Jan, Month.Feb, Month.Mar]

// 04 - 异构枚举(数字和字符串的混合)
enum Enum {
  A,
  B,
  C = "C",
  E = 8,
}

// 枚举成员
1) 枚举成员的值是不可修改的
Role.Reporter = 0  //error
2) 常量成员和计算成员
enum Char {
    // const member 常量成员
    a,
    b = Char.a,
    c = 1 + 3,
    // computer member 计算成员
    d = Math.random(),
    e = '123'.length,
    f = 4
}

```

### 6.字面量类型

使用场景：用来表示一组明确的可选值列表
```js
function changeDirection(direction: 'up' | 'down' | 'left' | 'right') {}
changeDirection('left')

```

### 7.typeof 操作符
typeof 操作符：[类型查询] 可以在类型上下文中引用变量或属性的类型。\
场景：根据已有变量的值，获取该值的类型，来简化类型书写
```js
let p = { x: 1, y: 2 }
function formatPoint(point: typeof p) {}
formatPoint({ x: 1, y: 100 })

// function formatPoint(point: { x: number; y: number }) {}
```

## 二.高级类型

### 1.联合类型 ｜ 交叉类型
```js
// 联合类型 
let myPhone: number | string  = '010-820'
const fn = (something:number | boolean):boolean => {
     return !!something
}

// 交叉类型
interface People {
  age: number,
  height： number
}
interface Man{
  sex: string
}
const xiaoman = (man: People & Man) => {
}
xiaoman({age: 18,height: 180,sex: 'male'});
```

### 2.类型推断

类型注解可以省略不写，推论机制会帮助提供类型
- 1)声明变量并初始化时 
- 2)决定函数返回值时

```js
let age = 18
// 初始化的地方，可以省略类型注解
// let age:number = 18
```

### 3.类型断言

表示：值as类型　或　<类型>值

1.类型断言：
```js
let strLength: number = (someValue as string).length
let strLength: number = (<string>someValue).length
```
    
```js
// 可以使用类型断言来推断它传入的是A接口的值
interface A {
    run: string
}    
interface B {
    build: string
}
const fn = (typeVal: A | B): string => {
    return (typeVal as A).run
}

// any临时断言（访问任何属性都是允许的）
(window as any).abc = 123
```

- 1. 使用 as 关键字实现类型断言。
- 2. 关键字 as 后面的类型是一个具体的类型(HTMLAnchorElement 是 HTMLElement 的子类型)
- 3. 通过类型断言，aLink 的类型变得更加具体，这样就可以访问 a 标签特有的属性或方法了。

```js
const aLink = document.getElementById('link') as HTMLAnchorElement
aLink.href

// 如何获取 HTMLAnchorElement 这个具体标签类型
// 首先根据鼠标提示，获取 HTMLElement，再进入提示文件lib.dom.d.ts， 
// 查找 HTMLElementTagNameMap，可以获取具体类型
```

2.非空断言

x! --- 将从x值域中排除 null 和 undefined
```js
// 忽略 undefined 和 null 类型
function myFunc(maybeString: string | undefined | null) {
  const onlyString: string = maybeString;   // Error (严格语法时报错)
  const ignoreUndefinedAndNull: string = maybeString!; // Ok
}

// 调用函数时忽略 undefined 类型
type NumGenerator = () => number;

function myFunc(numGenerator: NumGenerator | undefined) {
  const num1 = numGenerator();    // Error
  const num2 = numGenerator!();   //OK
}
```

3.确定赋值断言

确定赋值断言，Ts编译器就会知道该属性会被明确地赋值
```js
let x!: number
```

### 4.内置对象
内置对象：它们可以直接在 TS 中当做定义好了的类型。
- ECMAScript 的内置对象：Boolean、Number、string、RegExp、Date、Error
- DOM 和 BOM 的内置对象：Document、HTMLElement、Event、NodeList 等
- 定义Promise

```js
let body: HTMLElement = document.body;
let div:HTMLElement = document.querySelector('div') as HTMLDivElement
```

```js
// 返回的resolve值，类型是数字
function promise():Promise<number>{
    return new Promise<number>((resolve,reject)=>{
        resolve(1)
    })
}

promise().then(res=>{
    console.log(res)
})
```

### 5.类型别名

类型别名：**[自定义类型]** 为任意类型起别名。\
使用场景：**简化该类型的使用**，当同一类型（复杂）被多次使用时，可以通过类型别名。

1. 使用 type 关键字来创建类型别名。
2. 类型别名（比如，此处的 CustomArray），可以是任意合法的变量名称。
3. 创建类型别名后，直接使用该类型别名作为变量的类型注解即可。

```js
type strNum = string | number
let s1: strNum = 123
let s2: strNum = '123'

type CustomArray = (number | string)[]
let arr01:CustomArray = ['1', 'a', '2', 'b']
```

### 6.类型兼容性
有两种类型系统：
- 1 Structural Type System（结构化类型系统） 
- 2 Nominal Type System（标明类型系统）

TS 采用的是结构化类型系统，也叫鸭子类型，类型检查关注的是值所具有的形状。
- 如果两个对象具有相同的形状，则认为它们属于同一类型
- 成员多的可以赋值给少的

```js
// 1.接口兼容性
class Point { x: number; y: number;}
class Point3D {x: number;y: number;z: number;}
const p1: Point = new Point3D();
```

```js
// 2.接口兼容性
interface Point {x: number; y: number;}
interface Point3D { x: number; y: number; z: number;}
p1 = p3
```

```js
// 3.函数之间兼容性比较复杂，
// 需要考虑：1 参数个数 2 参数类型 3 返回值类型。
// 对象类型：
type F7 = () => { name: string }
type F8 = () => { name: string; age: number }
f7 = f8
```


## 三.Class 类

### 1.属性与方法

```js
class Person {
    // 静态属性
    static max: number = 100
    // 成员属性
    name: string

    // 构造函数 - 类被初始化时,自动执行方法
    // 作用：为类的实例属性设置初始值
    constructor(n: string) {
      this.name = n
     }

    // 静态方法
    static getClassName() {
        return "Class name is Greeter";
    }

    // 成员方法
    run(): void {
        console.log(this.name)
    }
}

// 构造函数就是在类被初始化的时候，自动执行的一个方法
// 我们通过这个构造方法经常作很多需要提前完成的工作，比如显示页面前我们要从后台得到数据
```

```js
// 01 实例类类型
// 类本身就是一种类型，类的名字可以直接作为类型名。
// 声明p为Person类型并赋值(默认为any)
let p: Person = new Person('张三') 


// 02 静态类类型(类本身)
// typeof Person是表明该对象是一个Person类的类型,而不是Person的实例类型

let Person2: typeof Person = Person
Person2.max = 150
console.log(Person === Person2)

```

### 2.类的继承  extends、super

**在ts中**，我们可以通过 extends 关键字来实现继承，是类与类的层次模型(一个类只能继承一个父类)
```js
// 基类  /  超(父)类
class Person {
    public name: string
    constructor(name: string) {
        this.name = name
    }
    ...
}


// 派生类  /  子类
class Student extends Person {
  age: number
  constructor(name: string, age: number) {
    super(name)  // super 继承基类的构造器，并向基类的构造器传参，super必须写在第一行
    this.age = age
  }
  work() {
    console.log(this.age)
  }
}
let s = new Student('李四', 18)
s.run()
s.work()
```

### 3.类的修饰符

类的修饰符:控制类成员的可访问性

- public:    公有, 在类、子类、类外部都可以访问
- protected: 保护, 在类、子类里可以, 在类的外部无法访问
- private:   私有, 在类里面可以访问, 在子类和类的外部无法访问
- readonly:  只读, 在声明时或构造函数里被初始化

在子类中通过super调用父类原型的属性和方法时，也只能够访问到父类的public和protected方法，否则会报错

```js
class Animal {
  private name: string
  readonly age: string
  constructor(theName: string) {
    this.name = theName
  }
}
```

### 4.寄存器

TS 中也可以对一个属性时用 get 和 set 方法对一个属性内部的获取和赋值进行拦截

```js
let passcode = 'secret passcode'

class Employee {
  private _fullName: string
  get fullName(): string {
    //对fullName属性进行拦截
    return this._fullName
  }
  set fullName(newName: string) {
    if (passcode && passcode == 'secret passcode') {
      this._fullName = newName
    } else {
      console.log('Error: Unauthorized update of employee!')
    }
  }
}

let employee = new Employee()
employee.fullName = 'Bob Smith'
if (employee.fullName) {
  alert(employee.fullName)
}

```

### 5.静态属性和静态方法

静态属性和静态方法必须使用 -类名- 调用。

静态方法调用不了实例方法和实例属性。（静态域的加载是在解析阶段，实例化是在初始化阶段）

```js
class Xiaogege {
	age: number = 28
	static name:string = ‘静态属性’；
	static say() {
		console.log(‘静态方法’)
		console.log(this.name)
		console.log(this.age)     // 错误
	}
}

console.log(Xiaogege.name)
Xiaogege.say()    		

let xiaoge = new Xiaogege()      
xiaoge.say()                  // 错误
console.log(xiaoge.name)      // 错误
```

### 6.抽象类

使用 abstract 声明的类，为抽象类(abstract定义抽象类和抽象方法)

不能直接被实例化,只能被其他类所继承

在工作中，我们也会把这样的需求用接口来实现

```js
abstract class Animal { 
	name: string;
	constructor (name:string) { this.name = name }
	abstract  eat () : void
	abstract  eat () : {        // error
		console.log(`${this.name}吃骨头`
	}
}
class Gou extends Animal { 
	constructor (name:string) { super(name)}
	eat () : void{ console.log(`${this.name}吃骨头`) }
	abstract  say () : void         // error
}
const gou : Gou = new Gou(‘汪汪’)
gou.eat()
```

### 7.多态

类类型(class) -- 多态 => 重写方法

父类定义一个方法不实现，让子类去实现，每个子类的该方法有不同的表现

```js
class Animal { 
	name: string;
	constructor (name:string) { this.name = name }
	eat ():void
}
class Gou extends Animal { 
	constructor (name:string) { super(name)}
	eat (){ console.log(`${this.name}吃骨头`) }
}
class Mao extends Animal { 
	constructor (name:string) { super(name)}
	eat () { console.log(`${this.name}吃鱼干`) }
}
const gou : Gou = new Gou(‘汪汪’)
gou.eat()
const mao : Mao = new Mao(‘喵喵’)
mao.eat()

```


## 四.其他部分

### 1. tsconfig.json配置文件

[官网配置](https://www.tslang.cn/docs/handbook/tsconfig-json.html)

[tsconfig.json配置文件-范例](https://xiaoman.blog.csdn.net/article/details/122525099)

### 2. namespace命名空间

- 使用namespace命名空间,防止全局污染
- 内部模块，主要用于组织代码，避免命名冲突。
- 命名空间内的类默认私有
- 通过 namespace 关键字定义；通过 export 暴露

实际中，ts写的项目，可能用不上namespace, 毕竟export就可以产生模块, 模块天然就有隔离分组作用.
```js
namespace Shape { 
    const pi = Math.PI 
    export function cricle(r: number) { 
       return pi * r ** 2 
    } 
}
```

```js
// 2种引入方式
<reference path="xxx.ts" />  // reference导入
import {Food} from './xxx';  // 使用import导入
```


### 3. 三斜线指令

三斜线指令是包含单个XML标签的单行注释， 注释的内容会做为编译器指令使用。
```js
/// <reference path="..." />

// 指令是三斜线指令中最常见的一种。 它用于声明文件间的 依赖。
// 三斜线引用告诉编译器在编译过程中要引入的额外的文件
```

### 4. 声明文件d.ts

当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能。

关于这些第三发的声明文件包都收录到了 npm (https://www.npmjs.com/~types?activeTab=packages)

- .d.ts 是 declaration（类型声明文件）
- 类型声明文件 为JS 提供类型信息

**1. 使用已有的类型声明文件:**

1 内置类型声明文件：\
TS 为 JS运行时可用的所有标准化内置 API 都提供了声明文件（如lib.es5.d.ts 或 lib.dom.d.ts）\
2 第三方库的类型声明文件:\
@types/express

**2. 创建自己的类型声明文件：**

1 项目内共享类型\
2 为已有 JS 文件提供类型声明。

**declare 关键字：**\
用于类型声明，为其他地方（比如，.js 文件）已存在的变量声明类型，而不是创建一个新的变量。
1. 对于 type、interface（只能在 TS 中使用的类型），可以省略 declare关键字
2. 对于 let、function 等，应该使用 declare 关键字，明确指定此处用于类型声明。

```js
declare var 声明全局变量
declare function 声明全局方法
declare class 声明全局类
declare enum 声明全局枚举类型
declare namespace 声明（含有子属性的）全局对象
interface 和 type 声明全局类型
/// <reference /> 三斜线指令
```

例：当安装一个express，import后报错了，出现红波浪线，解决方式：
 
- 方式1：去下载他的声明文件 npm install @types/express -D
- 方式2：创建一个文件.d.ts去声明， declare const express: ()=> any