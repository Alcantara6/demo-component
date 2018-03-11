const storage_key = 'todos-vuejs';

export default {
	fetch () {
		// 默认如果没有则返回null，所以加一个空数组
		return JSON.parse(window.localStorage.getItem(storage_key) || '[]'); 
	},
	save (item) {
		window.localStorage.setItem(storage_key,JSON.stringify(item));
	}
}