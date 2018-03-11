My demo and component
===

jQuery--放大镜demo
---
预览地址: [放大镜](https://alcantara6.github.io/demo-component/demo-zoom/zoom.html)，[图片异步加载的测试](https://alcantara6.github.io/demo-component/demo-zoom/analyse_of_image_loading.html)  
[博客：用jQuery编写放大镜效果以及图片异步加载的测试](http://blog.csdn.net/alcantara/article/details/78117956 '点击查看博文')这是一篇关于本人编写的放大镜demo的详细博文，包含对关键点、bug的分析，以及针对图片异步加载的测试。  
![放大镜插件效果图](./demo-zoom/images/demo展示效果.png '效果图')  

#### 项目特点
1. 函数封装良好，代码层次清晰、简洁，总共不足70行（还可再优化）
2. 使用jQuery定位方法，图片自适应窗口大小，添加任意尺寸图片都可使用

#### 技术应用
* jQuery定位放大镜元素：`outerWidth()`, `outerHeight()`, `width()`,`height()`,`offset`, `event.pageX`, `event.pageY`,
* 创建、插入、移除放大镜、放大图：创建jQuery对象`$(HTML)`、jQuery对象插入DOM `appendTo()`、`show()`、`hide()`、`remove()`
* 图片的load事件：`$('img').on('load', callback)` 在图片加载完成后执行回调函数
* 放大镜位置和放大图位置：`Math.min(Math.max(a,b),c)`方式计算
* 放大镜鼠标事件：阻止冒泡，`mouseenter()`, `mousemove()`注意绑定元素，`mouseleave()`注意鼠标是否能离开放大镜


轮播图
---
### 1. jQuery方法
**预览地址**：[jQuery轮播--滚动](https://alcantara6.github.io/demo-component/slideshow_by_jQuery/zoom.html/slideShow_roll.html)，[jQuery轮播--淡入淡出](https://alcantara6.github.io/demo-component/slideshow_by_jQuery/zoom.html/slideShow_fade.html)  
jQuery方法实现幻灯片/轮播效果，思路为图片元素横向排列，鼠标mouseover事件获取当前图片序列，jQuery动画根据序列改变图片集的位置。

#### 项目特点
jQuery方式的链式操作使得代码相当简练。

#### 技术应用：
**1. 滚动式效果**
* `样式布局` 
  * 图片窗口相对定位`relative`
  * 图片窗口外部不可见`overflow: hidden`
  * 图片列表`ul`绝对定位`absolute`
  * 图片项浮动定位`float`
* `获取图片序列`
  * jQuery的`index()方法`***带参数和不带参数用法区别***
  * 获取目标图片序列: mouseover事件函数的`this`
  * 获取当前图片序列(用于自动播放时获取计算目标图片序列)：`.filter(":has('chos')")`, 'chos'为当前高亮tab的所属的class
* `移动图片`
  * 根据序列index计算位置，`absolute`定位下的`left`属性
  * jQuery动画animate()
* `停止动画.stop()和判断图片是否处于动画状态.is(":animated")的用法区别`  
  如果鼠标在tab按钮快速来回切换，如何使图片切换顺畅。 这里使用stop(true,true)
  `is(":animated")`, `stop()`, `stop(true)`, `stop(true,true)`, `stop(false,true)`如何选用？  
  参见**我的博文**：  
  [jQuery实现轮播效果及stop()和is(:animated)的用法区别](http://blog.csdn.net/alcantara/article/details/78208844 'jQuery轮播分析')  

**2. 淡入淡出效果**  
这种方式代码相对简单，主要使用`find()`、`eq()`、`siblings()`、`addClass()`、`removeClass()`、`fadeIn()`、`fadeOut()`等方法

**3. 自动播放**
* `setInterval`+`clearInterval`循环
* `hover()`方法，同一元素绑定多个事件类型，相当于`mouseover`+`mouseleave`


### 2. Vue方法
**预览地址**：[Vue轮播](https://alcantara6.github.io/demo-component/vue-component/dist/index.html)   
#### 组件特点
**直接引入，更换你自己的图片即可。图片大小，媒体类型，窗口大小都是自适应的。**
Vue方法实现幻灯片/轮播效果，思路为`data`中的响应式数据控制图片显示、隐藏，`v-if`结合`transform`/`transition`过渡控制图片的切换，计算属性返回目标图片序列并通过`click`(或`mouseover`)事件传入`methods`中的切换函数。
#### 技术应用
* `样式布局` 
  * 窗口相对定位`relative`
  * 窗口外部不可见`overflow: hidden`
  * 图片绝对定位`absolute`
* `获取图片序列`
  * 当前图片序列：data中的`响应式数据`
  * 获取目标图片序列：`计算属性`、列表渲染的`v-for`的`index`值，`事件传参`
* `移动图片`
  * 条件渲染`v-if`
  * Vue过渡，`transform`/`transition`（相当于CSS3的属性）
* 不同切换方向
  * `动态过渡`，v-bind:name。计算属性返回name值。
* 图片自适应
  JavaScript根据图片实际大小设置图片窗口高度，前提：每张图片尺寸需相同。
  * 获取、设置图片窗口尺寸：`DOM操作`，`clientWidth`，`.style.width`
  * 获取图片实际尺寸：`naturalHeight`属性，`naturalWidth`属性，`Img对象`
  * 解决图片异步加载：`window.onload`调用，`window.onresize`(性能优化)调用，`mounted`钩子函数中调用

todoListt
---
**预览地址**：[todoList](https://alcantara6.github.io/demo-component/app-todoList/dist/index.html)   
todoList是Vue的入门实战小项目，我的todoList有以下几个突出项：
* 待办事项`:disabled`属性与isDone绑定，即完成后就不可再更改表单的value(checkbox)，如要更改可点选后面的重置按钮
* 加入完成时间。每项确认完成后，插入实时完成时间，`new Date().toLocaleString()`
* `计算属性`中统计已完成、未完成项
* `使用window.localStorage`，获取和存储待办事项。`watch`选项监听todos的变化，`深度watcher`。不能放在computed中，因store是缓存，计算属性也相当于是缓存。