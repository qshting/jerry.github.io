2. Proxy 与 Object.defineProperty缺
Object.defineProperty缺点：
无法直接监听对象，需要循环递归遍历监听对象的属性
无法监听对象新增加的属性
无法监听数组的push/shift/pop等方法


Proxy优势：
- 基于ES6的proxy实现数据劫持(即双向绑定)
- 可以直接监听对象而非对象属性
- 可以直接监听数组的变化
- Proxy有多达13种拦截方法，不限于apply、ownKeys、deleteProperty、has等等是Object.defineProperty不具备的。
- Proxy返回的是一个新对象，我们可以只操作新的对象达到目的，而Object.defineProperty只能遍历对象属性直接修改。

 let proxyObj = new Proxy(obj,{
        get : function (target,prop) {
            return prop in target ? target[prop] : 0
        },
        set : function (target,prop,value) {
            target[prop] = 888;
        }
    })

3.vue3与vue2的不同：

选项式与组合式的写法

1)重写双向数据绑定

- object.defineProperty是用来做响应式更新的,和双向绑定没有关系
- vue将遍历此对象所有的属性,并使用Object.defineProperty把这些属性全部转为getter/setter
-Vue3.x因为Proxy可以直接监听对象和数组的变化。并且作为新标准将受到浏览器厂商重点持续的性能优化


2) 优化虚拟dom
Vue2中,每次更新diff,都是全量对比；
Vue3则只对比带有标记的,这样大大减少了非动态内容的对比消耗


3) v3支持多个根节点，支持render JSX 写法

4) Tree shaking
非引入模块，不会打包在基础包中

5) 组合式Composition Api(Setup 函数式编程)

6）组合式函数,自定义Hooks(优于mixIn)