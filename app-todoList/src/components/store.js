const storage_key = 'todos-vuejs';

export default {
	fetch () {
		return JSON.parse(window.localStorage.getItem(storage_key) || '[]'); // 如果没有则返回null，所以加一个空数组
	},
	save (item) {
		window.localStorage.setItem(storage_key,JSON.stringify(item));
	}
}