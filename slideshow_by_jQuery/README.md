轮播图
---
### jQuery方法
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