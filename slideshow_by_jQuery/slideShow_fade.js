//轮播效果
$(function() {
	var $tabLinks = $("#slideShow .tab a");
	var $picUl = $("#showPic ul");
	// 选项卡数量
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
		//实时获取目标页和之前页
		next_index = $tabLinks.index(this);
		fadeShow(next_index);
	});

	//自动播放
	$("#slideShow").hover(function() {
		//鼠标进入slideShow停止动画
		if(adTimer) {
			clearInterval(adTimer);
		}
	}, function() {
		adTimer = setInterval(function() {
			// 实时获取获取目标页和之前页，因为有可能之前是手动mouseover指向了某一页
			pre_index = $tabLinks.parent().filter(":has(.chos)").index();
			//next与pre相差1
			next_index = (pre_index === len-1)?0:pre_index + 1;
			fadeShow(next_index, pre_index);
		}, 3000);
	}).trigger("mouseleave");

	//淡入淡出显示不同的幻灯片
	function fadeShow(next_index) {
		//1. 选项卡高亮和变淡
		$tabLinks.removeClass("chos").css("opacity", "0.7")
			.eq(next_index).addClass("chos").css("opacity", "1");
		$picUl.find('li').eq(next_index).stop(true,true).fadeIn(300).siblings().fadeOut(300);
	}
});