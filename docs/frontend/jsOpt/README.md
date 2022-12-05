---
title: 知识概述
---

## 1.非空判断

##### 1).判断字符是否为空

```js
if(strVal || strVal===0){
    // ... 不为空时候去处理
}
```

取反运算符，以下都为false，如：false、undefined、null、空字符串（''）、数字0、数字NaN


##### 2).判断数组是否为空

要注意数组是否被转换为undefined

```js
let arr = []
if (arr.length === 0){
     // ... 为空的时候去处理
}
```


##### 3).判断对象是否为空

1) es6中可以使用Object.keys(obj)，该方法返回值是对象中属性名组成的数组
```js
if(Object.keys(data).length === 0){
    // ... 为空的时候去处理
}
```

2) 将json对象转化为json字符串，再判断该字符串是否为空


##### 4).判断为空的简写方法

```js
if (letiable1 !== null || letiable1 !== undefined || letiable1 !== '') { 
    // ... 不为空
} 
```

##### 5).用户输入框为空

为空格，制表符，换页符 等，用正则去掉空符来判断

```
if (str.replace(/(^s*)|(s*$)/g, "").length ==0) { 
    console.log('不能为空')
}
```

## 2.浅拷贝/深拷贝

赋值:  赋的是该对象的在栈中的地址，而不是堆中的数据。
浅拷贝: 拷贝后，对象的基本数据类型互不影响，但二级子类型数据会影响
深拷贝: 拷贝后，新的内存地址,数据互不影响


对象的浅拷贝

- 1、对象的直接遍历赋值
- 2、ES6中的 let copyObj = Object.assign({}, obj);
- 3、ES7扩展运算符 let copyObj = { ...obj }

对象的深拷贝

- JSON.parse(JSON.stringify())
- 可以实现数组或对象深拷贝,但不能处理函数和正则

## 3.数组对象

##### 1). 添加新属性（数组对象）

如：添加1项属性showIndex

```js
arr.forEach((item,index) => {
    item.showIndex = index
})
```

```js
// 方式 1
let newArr = arr.map( item =>{
    return {...item, isSelected:true}
})
```


```js
// 方式 2
let newArr = []
arr.map(item => {
  newArr.push(
      Object.assign({},item,{isSelected:true})
    )
})
```

##### 2). 删除
```js
for (let i = 0; i < length; i++) {
    if (_arr[i] == _obj) {
        if (i == 0) {
            _arr.shift(); //删除并返回数组的第一个元素
            return _arr;
        }
        else if (i == length - 1) {
            _arr.pop();  //删除并返回数组的最后一个元素
            return _arr;
        }
        else {
            _arr.splice(i, 1); //删除下标为i的元素
            return _arr;
        }
    }
}
```

##### 3.去重（数组对象中，根据1个属性）

```js
// 回显数据去重处理
let obj = {}
let newArr = orgArr.reduce((cur, next) => {
    if (!obj[next.lesseeId]) {
      obj[next.lesseeId] = true
      cur.push(next)
    }
    return cur
}, [])
```

## 4.if.else的替代

##### 1).排非策略和三元运算符
```js
if (!user || !password) return throw('数据不能为空!')
```
##### 2).多条件判断
```js
if (type === 'jpg' || type === 'png' || type === 'gif' || type === 'svg') {
 // ...
}

// 等效于：
if (imgArr.includes(type)) {
  // ...
}
```
##### 3).对象关联的键值对
```js
let enums = {
'A': handleA,
'B': handleB,
'C': handleC
}
function action(val){
    let handleType = enums[val]
    handleType()
}
```

## 5.产生undefined的情况:

- 1）可能未被初始化的变量
- 2）对象中未初始化或者不存在的属性(方法)
- 3）函数中被忽略的可选参数
- 4）不存在的数组元素等时(超出下标)，
- 5）用来表明请求值丢失的返回值

访问不存在的属性不会引发错误。尝试从不存在的属性值获取数据时出现错误

```js
// TypeError：undefined is not a function
// TypeError：无法读取未定义的属性'<prop-name>'
// Uncaught TypeError: Cannot read properties of undefined (reading 'dd')
```

**建议：**
- 减少未初始化变量的使用
- 使变量生命周期变短并接近其使用的来源
- 尽可能为变量分配一个初始值
- 使用默认值作为无意义的函数参数
- 验证属性的存在或用缺省属性填充不安全的对象

## 6.js常见报错:

1. Uncaught TypeError: Cannot read property .. of undefined
   在尝试去读取一个undefined变量的属性 或者 调用undefined变量的方法就会报错。

2. Uncaught TypeError: ‘undefined’ is not a function
   调用了没有定义的方法导致(大多是因为在回调函数或者是闭包中，对this的理解不够造成的)

3. Uncaught RangeError：
   有一种就是使用了递归却没有使用停止的条件

4. Uncaught ReferenceError: .. is not defined

5. 访问一个没有定义或者不在当前作用域的变量会报这个错。

 

