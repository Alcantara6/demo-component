<!-- 注意：列表key不能绑定index，会出错，也不要绑定文本，以免重复，推荐绑定单独的id（如果data数据没有，可在逻辑中增加） -->
 <!-- 完成事件后不要减小id号，否则后面添加的id可能与前面的重复 -->

<template>
  	<div id="app">
        <img src="./assets/todo.jpg" style="width: 350px" alt='todo Logo'> 
        <div id="todoList">
            <!-- 组件-输入新的待办事项 -->
            <todoAdd v-on:add='addNewTodo'></todoAdd> 
            <!-- 待办事项列表，被操作的data数据-->
            <transition-group tag='ul' name='todoUl'>
                <li 
                class='todoItem' 
                v-for='(todo,index) in todos' 
                :key='todo.id'>
                      <!-- v-model双向绑定-->
                      <input type='checkbox' :disabled='todo.isDone' v-model='todo.isDone' @change='addTime(todo)'>
                      <!-- 待办事项序号、内容 -->
                      <span :class='{hasDone:todo.isDone}'>
                          {{index+1}}. {{todo.title}}
                      </span>
                      <!-- 完成时间 -->
                      <span class='finishedTime' v-if='todo.isDone'>
                          {{ todo.finishedTime }}
                      </span>
                      <div class="todoItemBtn"> 
                          <!-- 重置待办事项 -->
                          <button type='button' @click='todo.isDone=false'>
                              {{ 'reset' }}
                          </button>
                          <!-- 移除待办事项 -->
                          <button type='button' @click='remove(index)'>
                              &times;
                          </button>
                      </div>
                </li>
            </transition-group> 
            <!-- 剩余多少项待办 -->
            <p class='summarize' v-if='!left'>已完成所有待办事项</p>
            <p class='summarize' v-if='left'>
                共<strong>{{total}}</strong>件待办事项，
                <strong>{{finished}}</strong>件已完成，
                <strong>{{left}}</strong>件未完成。
            </p>
        </div>
    </div>
</template>

<script>
import todoAdd from './components/todoAdd';
import store from './components/store';

export default {
  name: 'app',
  components:{
    todoAdd,store
  },
  data () {
    return {  
      todos: store.fetch(),
      nextTodoId: 1           //id库
    }
  },
  // 计算属性，统计完成情况。
  computed: {
      total() {
        return this.todos.length;
      },
      finished() {
          let finishedTodos = this.todos.filter(item => item.isDone);
          return finishedTodos.length;
      },
      left() {
        return this.total - this.finished;
      }
  },
  methods:{
      remove: function (index) {
        this.todos.splice(index,1);
        // this.nextTodoId--;           //不要再减，否则后面添加的id会与前面的重复
      },
      addNewTodo: function (newTodoItem) {
        this.todos.push({
          id: this.nextTodoId++,        // 为每项增加id,以便key绑定
          title:newTodoItem,
          isDone:false
        });
      },
      addTime: function (todo) {
        if(todo.isDone) {
          let myDate = new Date();
          this.$set(todo,'finishedTime', myDate.toLocaleString() + '完成');
        }
      }
  },
  watch: {
      todos: {
        handler:function(newVal) {
            store.save(newVal);
        },
        deep:true
      }
    }
}
</script>

<style>
* {
    margin: 0; 
    padding: 0;
}
body {
    font: 14px/1.5 Tahoma,Helvetica,Arial, "Microsoft YaHei", "Hiragino GB", Sans-serif;
    text-align: center;
    min-width: 450px;
}
ul {
    width: 450px;
    margin: 10px auto;
    text-align: left;
    line-height: 2;
    list-style-type: none;
}
input[type='checkbox'],
button {
    cursor: pointer;
}

/*待办内容*/
.todoItem input {
    vertical-align: text-bottom;
    margin-bottom: 2px;
}
.todoItemBtn {
    float: right;
}
.todoItemBtn button {
    padding: 0 5px;
    margin-right: 10px;
    border: .5px solid #ccc;
    outline-width: 0;
    background: #fff;
}
.todoItemBtn button:hover {
    background: #c11b17;
    color: #fff;
}
/*已完成*/
.hasDone {
    text-decoration: line-through;
    background: #fcc;
}
.finishedTime {
    padding-left: 15px;
    font: 12px/1 "Hiragino GB";
    color: #2b65ec;
    font-style: italic;
}
/*统计*/
.summarize {
    font: 16px/2 "Hiragino GB";
}
.summarize strong {
    color: #f00;
}

/*过渡动画*/
.todoUl-enter,
.todoUl-leave-to {
    transform: translateX(-999px);
    opacity: 0;
}
.todoUl-leave-active {;
    transition: all .5s ease;
    position: absolute;
}
.todoUl-enter-active {
    transition: all .5s ease;
}
.todoUl-move {
    transition: all .5s ease;
}
</style>