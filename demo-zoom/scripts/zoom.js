$(function () {
	var $parent = $("#product-zoom");
	//现有缩略图的宽高
	var dpWidth =  $parent.outerWidth();
	var dpHeight = $parent.outerHeight();
	//放大镜的大小
	var mSize = 120;
	//创建放大镜
	var $m_glass = $("<div id ='m-glass'></div>");
	// 缩略图的位置初始化，可不可以不设为全局变量?
	var dpPos = null;
	// 放大比例
	var scale = [];	

	// 首先引入图片src
	var $zoom_window = $("<div id ='zoom-window'><div><img src='images/product_image_big.jpg'></div></div>");
	// 图片插入文档，获得图片大小。
	$zoom_window.appendTo("#shop-details");
	// 图片加载之后，设置预览窗口的大小
	$zoom_window.find('img').on('load',function () {
		scale = imgScale($zoom_window, $parent);
	    $zoom_window.width(scale[0] * mSize + "");
	    $zoom_window.height(scale[1] * mSize + "");
	});

    // 鼠标进入缩略图
	$("#product-zoom a").mouseenter(function (e) {
		// 缓存图片title，放大镜在图片上时移除
		this.myTitle = this.title;
		this.title = '';
		// 缩略图位置
		dpPos = $parent.offset();
		//改变放大镜的位置
		showGlass(e, dpPos, dpWidth, dpHeight);
		//插入放大镜
		$m_glass.appendTo("#product-zoom");
		// 设置放大图片的属性、显示
		$zoom_window.find('img').attr('src',this.href);
		$zoom_window.show();
	});

	// 鼠标在缩略图移动
	$("body").on("mousemove", "#m-glass", function(e) {
		//改变放大镜的位置
		showGlass(e, dpPos, dpWidth, dpHeight);
		var left = dpPos.left;
		var top = dpPos.top;
		//设置放大区图片的位置
		// 放大镜靠缩略图框的最左侧时，放大图的left属性为最大：0，top同理
		var absLeft = -(e.pageX - mSize/2 - left)*scale[0];
		var absTop = -(e.pageY - mSize/2 - top)*scale[1];
		// 放大镜靠预览框最右侧时，放大图的left属性为最小：-(预览框宽度-放大镜宽度)，bottom同理
		var ultRight = -($zoom_window.find("img").width() - $zoom_window.width());
		var ultBottom = -($zoom_window.find("img").height() - $zoom_window.height());
		$zoom_window.find("img").css({
		    "left": (Math.max(Math.min(0, absLeft), ultRight)) + "px",
		    "top": (Math.max(Math.min(0, absTop), ultBottom)) + "px"
		});
	});

	// 鼠标离开缩略图
	$parent.mouseleave(function() {
			$(this).find("a").attr("title", this.myTitle);
			$m_glass.remove();
			$zoom_window.hide();
		});


	// 改变放大镜位置的函数
	function showGlass(e, dpPos, dpWidth, dpHeight) {
		var mLeft = Math.min(Math.max((e.pageX - mSize/2), dpPos.left), 
			                          (dpPos.left + dpWidth - mSize));
		var mTop = Math.min(Math.max((e.pageY - mSize/2), dpPos.top), 
			                         (dpPos.top + dpHeight - mSize));
		$m_glass.css({
		    "left": mLeft + "px",
		    "top": mTop + "px"
		});
	}
	//放大区的大小：大图/小图*放大镜尺寸
	function imgScale($big, $small) {
		// 必须先把元素插入文档才能获取大小
		var big_width = $big.find("img").width();
		var small_width = $small.find("img").width();
		var scaleX = big_width/small_width;
		var big_height = $big.find("img").height();
		var small_height = $small.find("img").height();
		var scaleY = big_height/small_height;
		return [scaleX, scaleY];
	}
});