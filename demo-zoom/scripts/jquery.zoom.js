 // 缩略图和放大图都放在./images文件夹，放大图的src等于缩略图的href
 ;(function ($) {
	 $.fn.extend({
	 	'zoom': function (options) {
            // 缩略图宽度默认320px，放大镜尺寸默认120px
            options = $.extend({
               thumbWidth: 320,
               zoomSize: 120
            },options); 
         	var $thumb = this;
            //现有缩略图的宽高
            $thumb.outerWidth(options.thumbWidth);
         	var tbWidth = $thumb.outerWidth();
         	var tbHeight = $thumb.outerHeight();

         	//创建放大镜和设置大小
         	var zoomSize = options.zoomSize;
            var $m_glass = $("<div id ='m-glass'></div>");
            $m_glass.width(zoomSize).height(zoomSize);

         	// 缩略图的位置初始化
         	var tbPos = null;
         	// 放大比例
         	var scale = [];	

         	// 创建预览区域
         	var bigImgSrc = $thumb.find('a').attr('href');
         	var $zoom_window = $("<div id ='zoom-window'><div><img src='" + bigImgSrc + "'></div></div>");
         	// 插入到缩略图之后
         	$zoom_window.insertAfter($thumb);
         	// 计算预览窗口大小
         	$zoom_window.find('img').on('load',function () {
         		scale = imgScale($zoom_window, $thumb);
         	    $zoom_window.width(scale[0] * zoomSize);
         	    $zoom_window.height(scale[1] * zoomSize);
         	});

         	$thumb.find("a").mouseenter(function (e) {
         		// 缓存图片title，放大镜在图片上时移除
         		this.myTitle = this.title;
         		this.title = '';
         		// 获得缩略图的位置
         		tbPos = $thumb.offset();
         		// 改变放大镜的位置
         		showGlass(e, tbPos, tbWidth, tbHeight);
         		// 插入放大镜
         		$m_glass.appendTo($thumb);
         		// 设置放大图src并显示
         		$zoom_window.find('img').attr('src',this.href);
         		$zoom_window.show();
         	});

         	$("body").on("mousemove", "#m-glass", function(e) {
         		//改变放大镜的位置
         		showGlass(e, tbPos, tbWidth, tbHeight);
         		var left = tbPos.left;
         		var top = tbPos.top;
         		// 设置放大区图片的位置
         		// 放大镜靠缩略图框的最左侧时，left为最大：0，top同理
         		var absLeft = -(e.pageX - zoomSize/2 - left)*scale[0];
         		var absTop = -(e.pageY - zoomSize/2 - top)*scale[1];
         		// 放大镜靠预览框最右侧时，left为最小：-(预览框宽度-放大镜宽度)，bottom同理
         		var ultRight = -($zoom_window.find("img").width() - $zoom_window.width());
         		var ultBottom = -($zoom_window.find("img").height() - $zoom_window.height());
         		$zoom_window.find("img").css({
         		    "left": (Math.max(Math.min(0, absLeft), ultRight)) + "px",
         		    "top": (Math.max(Math.min(0, absTop), ultBottom)) + "px"
         		});
         	});

         	$thumb.mouseleave(function() {
        			$(this).find("a").attr("title", this.myTitle);
        			$m_glass.remove();
        			$zoom_window.hide();
         	});

         	// 改变放大镜位置的函数
         	function showGlass(e, tbPos, tbWidth, tbHeight) {
         		var mLeft = Math.min(Math.max((e.pageX - zoomSize/2), tbPos.left), 
         			                          (tbPos.left + tbWidth - zoomSize));
         		var mTop = Math.min(Math.max((e.pageY - zoomSize/2), tbPos.top), 
         			                         (tbPos.top + tbHeight - zoomSize));
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
         	// 返回jQuery对象
            return this;
        }
     })
 })(jQuery);





