todoListt
---
**预览地址**：[todoList](https://alcantara6.github.io/demo-component/app-todoList/dist/index.html)   
todoList是Vue的入门实战小项目，我的todoList有以下几个突出项：
* 待办事项`:disabled`属性与isDone绑定，即完成后就不可再更改表单的value(checkbox)，如要更改可点选后面的重置按钮
* 加入完成时间。每项确认完成后，插入实时完成时间，`new Date().toLocaleString()`
* `计算属性`中统计已完成、未完成项
* `使用window.localStorage`，获取和存储待办事项。`watch`选项监听todos的变化，`深度watcher`。不能放在computed中，因store是缓存，计算属性也相当于是缓存。