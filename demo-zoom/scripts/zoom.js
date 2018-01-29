// v 1.1 把计算预览窗口大小放在全局作用域,使用.on('load'事件)
$(function () {
	var $parent = $("#product-zoom");
	//现有展示栏的位置、宽高,不能只是内容的高度
	var dpWidth =  $parent.outerWidth();
	var dpHeight = $parent.outerHeight();
	//放大镜的大小
	var mSize = 120;
	//创建放大镜
	var $m_glass = $("<div id ='m-glass'></div>");
	//可不可以不设为全局变量？
	var dpPos = null;
	var scale = [];	
	//创建预览区域,双层div。因为图片的父元素必须relative，但relative会占据原来位置，所以再在外面加一层div，设为absolute
	//要先把src引入，否则第一次不能出现预览框，为什么？？？？
	var $zoom_window = $("<div id ='zoom-window'><div><img src='images/product_image_big.jpg'></div></div>");
	// 先插入文档，才能获得图片大小。设置预览图的大小
	$zoom_window.appendTo("#shop-details");
	// v 1.1 把计算预览窗口大小放在全局作用域,使用.on('load'事件)
	$zoom_window.find('img').on('load',function () {
		scale = imgScale($zoom_window, $parent);
	    $zoom_window.width(scale[0] * mSize + "");
	    $zoom_window.height(scale[1] * mSize + "");
	    // console.log( $zoom_window.width);
	});
	$("#product-zoom a").mouseenter(function (e) {
		//获取光标位置
		this.myTitle = this.title;
		this.title = "";
		//不能放在全局变量，不然浏览器加载后就成为固定值，窗口缩小再mouseenter位置不对
		dpPos = $parent.offset();
		//改变放大镜的位置
		showGlass(e, dpPos, dpWidth, dpHeight);
		//插入放大镜
		$m_glass.appendTo("#product-zoom");
		//获取预览图链接，插入
		// 获取预览图链接，插入。如果此时才是第一次添加src加载图片
		// 由于是异步加载，根据图片的大小计算预览窗口的尺寸会先于图片完成
		//  此时图片尺寸为0，则计算出的预览窗口的尺寸为0
		//  第二次mouseenter时图片已加载完成，计算出需要的预览窗口
		//  v 1.1 把图片src和计算预览窗口放在全局作用域,提高性能
		$zoom_window.find('img').attr('src',this.href);
		$zoom_window.show();
	});

	$("body").on("mousemove", "#m-glass", function(e) {
		//改变放大镜的位置
		showGlass(e, dpPos, dpWidth, dpHeight);
		var left = dpPos.left;
		var top = dpPos.top;
		//设置预览图片的位置
		var absLeft = -(e.pageX - mSize/2 - left)*scale[0];
		var absTop = -(e.pageY - mSize/2 - top)*scale[1];
		var ultRight = -($zoom_window.find("img").width() - $zoom_window.width());
		var ultBottom = -($zoom_window.find("img").height() - $zoom_window.height());
		$zoom_window.find("img").css({
		    "left": (Math.max(Math.min(0, absLeft), ultRight)) + "px",
		    "top": (Math.max(Math.min(0, absTop), ultBottom)) + "px"
		});
	});

	// mouseleave事件要绑定在放大镜的父元素，不能绑定在兄弟元素或子元素。
	// 这样的话，鼠标每移动一下，程序认为它在放大镜$m_glass之内，
	// 是离开了兄弟元素（例如a元素)或子元素（例如image）的，就要触发mouseleave
	// 放大镜消失，放大镜一消失，就触发了mouseenter事件，放大镜出现。如此死循环。

	// 由于用函数给框框设置了界限，鼠标怎么动框框都在图片范围内，这样鼠标指针就可以脱离框框，实现解除绑定
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
	//预览区大小：大图/小图*放大镜尺寸
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

