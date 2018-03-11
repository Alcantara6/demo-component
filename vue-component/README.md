Vue component
---

### 1. 轮播图Vue方法
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