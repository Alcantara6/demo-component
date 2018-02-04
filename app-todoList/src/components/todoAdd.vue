<template>
	<div id='todoAdd'>
		<input type="text" id='todoInput' v-model='newTodoItem' @keyup.enter='todoAdd'>
		<button type='button' @click='todoAdd'>添加</button>
	</div>
</template>

<script>
	export default {
		name:'todoAdd',
		data () {
			return {
				newTodoItem:''
			}
		},
		methods: {
    		todoAdd: function () {
      			// $emit函数不能引用this，需先赋值
      			let newTodoItem = this.newTodoItem;
      			if (!newTodoItem) {
      				alert('输入不能为空');
      			}
      			else {
      				this.$emit('add',newTodoItem)
      				this.newTodoItem = '';
      			}     			
     		}
		}
	}
</script>  

<style scoped>
	#todoInput {
    	min-width: 400px;
    	height: 20px;
   		outline: 0;
  	}
</style>

