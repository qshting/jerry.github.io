(window.webpackJsonp=window.webpackJsonp||[]).push([[164],{694:function(s,t,a){"use strict";a.r(t);var e=a(60),r=Object(e.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("p",[s._v("在开发阶段，修改源码是不可避免的操作。对于开发网页来说，要想看到修改后的效果，就需要刷新浏览器让其重新运行最新的代码。虽然这相比于开发原生"),a("code",[s._v("iOS和Android")]),s._v("应用来说要方便很多，因为那需要重新编译这个项目再运行，但我们可以将这个体验优化得更好。 借助自动化的手段，可以将这些重复的操作交给代码去帮我们完成，在监听到本地源码文件发生变化时，自动重新构建出可运行的代码后再控制浏览器刷新。")]),s._v(" "),a("p",[s._v("Webpack将这些功能都内置了，并且提供了多种方案供我们选择。")]),s._v(" "),a("h2",{attrs:{id:"文件监听"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#文件监听"}},[s._v("#")]),s._v(" 文件监听")]),s._v(" "),a("p",[s._v("文件监听是在发现源码文件发生变化时，自动重新构建出新的输出文件。")]),s._v(" "),a("p",[a("code",[s._v("Webpack")]),s._v("官方提供了两大模块，一个是核心的webpack；另一个是webpack-dev-server。文件监听功能是webpack提供的。在使用DevServer时，监听模式默认开启。除此之外，还可以通过watchOptions来配置Webpack的监听模式，支持监听文件更新，在文件发生变化时重新编译。在使用Webpack时，监听模式默认是关闭的，打开需进行如下配置：")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("module"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("exports "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 只有在开启监听模式时，watchOptions才有意义")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 默认为false，也就是不开启")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("watch")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 监听模式运行时的参数")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 在开启监听模式时才有意义")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("watchOptions")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 默认为空，用来指定不监听的文件或文件夹，支持正则匹配")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("ignored")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token regex"}},[a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[s._v("node_modules")]),a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 监听到变化发生后等300ms再去执行动作，节流")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 防止文件更新太快而导致重新编译频率太快。默认为300ms")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("aggregateTimeout")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("300")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 判断文件是否发生变化是通过不停地询问系统指定文件有没有变化实现的，默认每秒询问1000次")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("poll")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1000")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br")])]),a("h3",{attrs:{id:"开启文件监听"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#开启文件监听"}},[s._v("#")]),s._v(" 开启文件监听")]),s._v(" "),a("p",[a("code",[s._v("Webpack")]),s._v("开启监听模式有以下两种方式：")]),s._v(" "),a("ol",[a("li",[s._v("在配置文件"),a("code",[s._v("webpack.config.js")]),s._v("中设置"),a("code",[s._v("watch: true")]),s._v("；")]),s._v(" "),a("li",[s._v("在执行启动"),a("code",[s._v("webpack")]),s._v("的命令时带上"),a("code",[s._v("--watch")]),s._v("参数，完整命令为"),a("code",[s._v("webpack --watch")]),s._v("或者"),a("code",[s._v("webpack -w")]),s._v("。")])]),s._v(" "),a("h3",{attrs:{id:"文件监听的工作原理分析"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#文件监听的工作原理分析"}},[s._v("#")]),s._v(" 文件监听的工作原理分析")]),s._v(" "),a("p",[s._v("原理：轮询判断文件的最后编辑时间是否发生变化。")]),s._v(" "),a("p",[s._v("在Webpack中监听一个文件发生变化的原理是：定时获取这个文件的最后编辑时间，每次都存下最新的最后编辑时间，如果发现当前获取的和最后一次保存的最后编辑时间不一致，就认为该文件发生了变化。配置项中的"),a("code",[s._v("watchOptions.poll")]),s._v("用于控制定时检查的周期(具体含义是每秒检查多少次)。")]),s._v(" "),a("p",[a("strong",[s._v("当发现某个文件发生了变化时，并不会立刻告诉监听者，而是先缓存起来，收集一段时间的变化后，再一次性告诉监听者")]),s._v("。配置项中的"),a("code",[s._v("watchOptions.aggregateTimeout")]),s._v("用于配置这个等待时间。这样做的目的在于：我们在编辑代码的过程中可能会高频地输入文字，导致文件变化的事件高频地发生，如果每次都重新执行构建，就会让构建卡死。")]),s._v(" "),a("p",[s._v("对于多个文件来说，其原理相似，"),a("code",[s._v("Webpack")]),s._v("会对列表中的每个文件都定时执行检查。但是怎么确定这个需要监听的文件列表呢？在默认情况下，"),a("code",[s._v("Webpack")]),s._v("会从配置的"),a("code",[s._v("Entry")]),s._v("文件出发，递归解析出"),a("code",[s._v("Entry")]),s._v("文件所依赖的文件，将这些依赖的文件都加入监听列表中。而不是粗暴地直接监听项目目录下的所有文件。")]),s._v(" "),a("div",{staticClass:"custom-block warning"},[a("p",{staticClass:"custom-block-title"},[s._v("WARNING")]),s._v(" "),a("p",[s._v("需要注意的：由于保存文件的路径和最后的编辑时间需要占用内存，定时检查周期检查需要占用CPU及文件I/O，所以最好减少需要监听的文件数量和降低检查频率。")])]),s._v(" "),a("h3",{attrs:{id:"优化文件监听的性能"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#优化文件监听的性能"}},[s._v("#")]),s._v(" 优化文件监听的性能")]),s._v(" "),a("p",[s._v("在开启监听模式后，默认情况下会监听配置的"),a("code",[s._v("Entry")]),s._v("文件和所有"),a("code",[s._v("Entry")]),s._v("递归依赖的文件。在这些文件中会有很多存在于"),a("code",[s._v("node_modules")]),s._v("下，因为现如今的项目会依赖大量的第三方模块。但是，在大多数情况下，我们不可能去编辑"),a("code",[s._v("node_modules")]),s._v("下的文件，而只是编辑自己的项目文件。")]),s._v(" "),a("ul",[a("li",[s._v("方法一：忽略"),a("code",[s._v("node_modules")]),s._v("下的文件，不监听它们。采用这种方法优化后，"),a("code",[s._v("Webpack")]),s._v("消耗的内存和"),a("code",[s._v("CPU")]),s._v("将会大大减少。")])]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("module"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("exports "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("watch")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("watchOptions")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 不监听node_modules目录下的文件")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("ignored")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token regex"}},[a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[s._v("node_modules")]),a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")])]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br")])]),a("ul",[a("li",[s._v("方法二："),a("code",[s._v("watchOptions.aggregateTimeout")]),s._v("的值越大性能越好，因为这能降低重新构建的频率。")]),s._v(" "),a("li",[s._v("方法三："),a("code",[s._v("watchOptions.poll")]),s._v("的值越小越好，因为这能降低检查的频率。")])]),s._v(" "),a("p",[s._v("但是后两种优化方法会导致监听模式的反应和灵敏度降低。")]),s._v(" "),a("h3",{attrs:{id:"文件监听缺陷"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#文件监听缺陷"}},[s._v("#")]),s._v(" 文件监听缺陷")]),s._v(" "),a("p",[s._v("唯一缺陷：每次都需要手动刷新浏览器。")])])}),[],!1,null,null,null);t.default=r.exports}}]);