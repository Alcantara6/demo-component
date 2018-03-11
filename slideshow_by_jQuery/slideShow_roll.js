//轮播效果
$(function() {
	//这里都是$函数内的全局变量
	var $tabLinks = $("#slideShow .tab a");
	var $picUl = $("#showPic ul");
	//单张宽度和选项卡数量
	var singleWidth = $("#showPic").width();
	var len = $tabLinks.length;
	//计时器
	var adTimer = null;
	//初始化页码
	var pre_index = 0;
	var next_index = 0;
	
	//初始化tab高亮
	$tabLinks.eq(0).css("opacity", "1");
	//移动到某项
	$("#slideShow .tab").on('mouseover', 'a', function() {
		//实时获取目标页
		next_index = $tabLinks.index(this);
		rollShow(next_index); 
	});

	//自动播放
	$("#slideShow").hover(function() {
		//鼠标进入slideShow停止动画
		if(adTimer) {
			clearInterval(adTimer);
		}
	}, function() {
		adTimer = setInterval(function() {
			//实时获取获取目标页和之前页，因为有可能之前是手动mouseover指向了某一页
			pre_index = $tabLinks.parent().filter(":has(.chos)").index();
			//next与pre相差1
			next_index = (pre_index === len-1)?0:pre_index + 1;
			rollShow(next_index, pre_index);
		}, 3000);
	}).trigger("mouseleave");

	//滚动显示不同的幻灯片,每次图片切换的时间time一样
	function rollShow(next_index, pre_index) {
		//移动之后的位置
		var new_pos = -(singleWidth * next_index);
		//移动的时长
		var time = next_index === 0 && pre_index === len-1?0:500;
		//1. 选项卡高亮和变淡
		$tabLinks.removeClass("chos").css("opacity", "0.7")
			.eq(next_index).addClass("chos").css("opacity", "1");
		//2. 轮播
		$picUl.stop(true,true).animate({left: "" + new_pos}, time);
	}
});