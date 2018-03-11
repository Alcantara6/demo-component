//轮播效果
$(function() {
	//这里都是$函数内的变量，相当于全局变量
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
		//实时获取目标页和之前页
		next_index = $tabLinks.index(this);
		// 1. 根据类获得index
		//注意filter内的选择器，是a中含有.chos
		//获取pre_index: index()不带参数写法是返回集合中第一个元素相对于其！同辈！元素的位置，a没有同辈元素
		pre_index = $tabLinks.parent().filter(":has(.chos)").index();
		// 2. pre_index = $tabLinks.filter(".chos").index($tabLinks);
		// 3. 通过当前图片位置得到之前页码
		/*	var current_pos = $picUl.position();
			var left = current_pos.left;
			if(left === 0) {
				pre_index = 0;
			} else {
				pre_index = (-left)/singleWidth;
			}
		*/
		rollShow(next_index, pre_index); 
		//fadeShow(next_index, pre_index);
	});

	//自动播放
	$("#slideShow").hover(function() {
		//鼠标进入slideShow停止动画
		if(adTimer) {
			clearInterval(adTimer);
		}
	}, function() {
		adTimer = setInterval(function() {
			//也是实时获取获取目标页和之前页，因为有可能之前是手动mouseover指向了某一页
			pre_index = $tabLinks.parent().filter(":has(.chos)").index();
			//或者：pre_index = $tabLinks.filter(".chos").index($tabLinks);
			//next与pre相差1
			next_index = (pre_index === len-1)?0:pre_index + 1;
			rollShow(next_index, pre_index);
			//fadeShow(next_index, pre_index);
		}, 3000);
	}).trigger("mouseleave");

	//滚动显示不同的幻灯片,如果每次图片切换的时间time一样，函数就可以不需要pre_index!
	function rollShow(next_index, pre_index) {
		//移动之后的位置
		var new_pos = -(singleWidth * next_index);
		//移动的时长
		var time = 0;
		if(next_index === 0 && pre_index === len-1) {
			time = 0;
		} else {
			// time = Math.abs(next_index - pre_index) * 400;
			// 都用同一时长，效果更好。
			time = 500;
		}
		//1. 选项卡高亮和变淡
		$tabLinks.removeClass("chos").css("opacity", "0.7")
			.eq(next_index).addClass("chos").css("opacity", "1");
		//2. 轮播
		//如果鼠标快速来回切换，由于tab高亮与图片对应，每次鼠标移动到某个tab必须保证图片也切换到对应的位置，
		//所以即使元素当前在移动，也要stop之，因此不能用is(:animated)作为再次移动的前提条件
		//如果是单击一个按钮进行切换，为避免动画积累用is(:animated)判定
		//if(!$picUl.is(":animated")) {   //不需要检查动画
			// 如果图片只移动了一部分,鼠标就转换tab再移动到另一张时：
			// 1. 用stop(true): 不会直接到达当前图片的末状态位置，移动到下一张的距离短，移动时间恒定，
			// 看上去就会显得很慢，影响用户体验。   适合于切换时间短的。
			// 2. 用stop(true,true): 会直接到达当前图片的末状态位置，适合于切换时间长的，
			// 但移到末状态会有突然一闪的效果
			$picUl.stop(true,true).animate({left: "" + new_pos}, time);
		//}
	}

	//淡入淡出显示不同的幻灯片
	function fadeShow(next_index) {
		//1. 选项卡高亮和变淡
		$tabLinks.removeClass("chos").css("opacity", "0.7")
			.eq(next_index).addClass("chos").css("opacity", "1");
		$picUl.find('li').eq(next_index).stop(true,true).fadeIn(300).siblings().fadeOut(300);
	}
});