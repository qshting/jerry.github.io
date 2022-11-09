---
title: 一、基础知识
---

初体验：安装和运行ts
```
$ npm install -g typescript
$ tsc -v 
$ tsc helloworld.ts
```

## 一.类型声明

类型注解, 就是类型声明

Boolean \ Number \ String \ Array \ Function \ Object \ Symbol \ undefined \ null
void \ any \ never \ 元组 \ 枚举 \ 高级类型

### 1.基础类型
```js
// 原始类型
let isDone: boolean = false
let count: number = 10
let name: string = 'smile'

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
let un: undefined = undefined
let nu: null = null
num = undefined
num = null
```

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

### 2.接口和对象类型

- 定义对象的方式要用关键字interface(让数据的结构满足约束的格式)
- 或者让TypeScript 做自动类型判断或者更加精确的指示，如接口等

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

### 3.数组类型
```js
//写法1：类型加[]
let arr1: number[] = [1, 2, 3]; //数字类型的数组
let arr2: string[] = ["1", "2"]; //字符串类型的数组
let arr3: any[] = [1, "2", true]; //任意类型的数组

//写法2：Array<类型>
let arr2: Array<number> = [1, 2]       // 泛型语法
let arr2: Array<number | string> = [1, 2, '4']  // 联合类型

// Tuple 元组
一种特殊的数组,它限定了元素的类型和个数
如果一个方法需要返回多个值，可以把这多个值作为元组返回，而不需要创建额外的类来表示
let tuple: [number, string] = [0, '1']
let tuple: [number, string] = ['good', '1']  //error
```

### 4.函数类型

函数类型有多种声明方式，一种是类型推断，或者是直接将一个函数的类型写全
```js
let add = (x: number, y: number) => x + y
let compute: (x: number, y: number) => number
```

```js
// 定义参数类型和返回值的类型
interface Add {
    (num:  number, num2: number): number
}

const fn: Add = (num: number, num2: number): number => {
    return num + num2
}
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

### 2.类型断言

表示：值as类型　或　<类型>值

1.类型断言：
```js
let strLength: number = (someValue as string).length
let strLength: number = (<string>someValue).length


interface A {
    run: string
}    
interface B {
    build: string
}
const fn = (type: A | B): string => {
    return (type as A).run
}
// 可以使用类型断言来推断他传入的是A接口的值
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

### 3.内置对象
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

### 4.类型别名

type 关键字（可以给一个类型定义一个名字）多用于符合类型
定义类型别名,定义函数别名, 定义联合类型别名,定义值的别名

```js
type str = string
let s:str = "我是小满"


type cb = () => string
let fn: cb = () => "我是小满"
 
type str = string | number
let s1: str = 123
let s2: str = '123'

type value = boolean | 0 | '213'
let s:value = true
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
```
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
```
public:    公有, 在类、子类、类外部都可以访问
protected: 保护, 在类、子类里可以, 在类的外部无法访问
private:   私有, 在类里面可以访问, 在子类和类的外部无法访问
readonly:  只读, 在声明时或构造函数里被初始化

在子类中通过super调用父类原型的属性和方法时，也只能够访问到父类的public和protected方法，否则会报错
```

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

```
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
