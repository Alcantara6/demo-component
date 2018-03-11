<!--     
    采用将图片ul横向排列，根据index计算绝对位置和css3过渡的方式
    为了使ul绝对定位，需要用js计算幻灯片wrap框的高度，且首尾切换效果不佳
    因此使用图片v-if加vue过渡的方式
 
	采用图片ul横向排列,如何只给出一个宽度，让组件图片响应式渲染。
	1.幻灯图片自适应窗口————利用设定宽度%
	(1)max-width相对父元素100%(单张图片是相对浏览器窗口，父元素继承浏览器窗口宽度),
	如要实现图片左右切换，ul要设置足够宽度，使图片横向排列
	ul设置300%，li设置33.333333%, img设置max-width为100%（li元素的100%） 
	(2)js实现，mounted周期window.onsize调用，但是window.onsize较繁琐
	slidePicWidth() {
	    var slideshowWidth = document.querySelector('#slideshow').clientWidth;
	    var slidePic = document.querySelectorAll('.slide-pic li');
	    for(let i=0; i<slidePics.length ;i++) {
	    	slidePics[i].width = slideshowWidth;
	    }
	}
-->
 
<template>
	<div id="slideshow" @mouseleave="runInv" @mouseenter="clearInv">
		<div class='slideshow-pics'>
			<ul>
				<li v-for="(picture,index) in pictures">
					<a :href="picture.link"><img :src="picture.img_url" alt="点击查看"></a>
				</li>
			</ul>
		</div>
		<a class="pre-button" @click="gotoPic(prevIndex)">previous</a>  
		<a class="next-button" @click="gotoPic(nextIndex)">next</a>
		<div class="choose-button">
			<ul>
				<li v-for="(picture,index) in pictures" @click="gotoPic(index)">
					<span :class="{'choose-button-selected':index === currentIndex}">{{ picture.title }}</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: 'slideshow',
	props: {
		'pictures': [Object,Array],
		'interval': {
			type: Number,
			default: 3000
		}
	},
	data() {
      return {
      	// invId相当于js的元素特性，jq的$(function () {})作用域的变量
      	currentIndex: 0,
      	invId: null,
      	timing: 0
      }
	},
	computed: {
	    prevIndex() {
	    	if(this.currentIndex === 0) {
				return this.pictures.length - 1;
			}
			else {
				return this.currentIndex - 1;
			}
	    },
	    nextIndex() {
	    	if(this.currentIndex === this.pictures.length -1) {
				return 0;
			}
			else {
                return this.currentIndex + 1;
			}
	    },
	    imgScale() {
	    	let slidePic = document.querySelector('.slideshow-pics img');
	    	return this.getImageNaturalSize(slidePic).height 
			/ this.getImageNaturalSize(slidePic).width;
	    }
	},
	beforeMount() {
		
	},
	mounted() {
        // 需要在图片加载完成后计算幻灯窗口高度
        window.onload = () => {
            this.setSlideshowHeight();
        }
        // 不能实现自适应窗口变化，增加window.onresize事件
        window.onresize = () => {
        	let resizeTimer = null;
    		// 通过增加定时器的方式来让代码延迟执行，这样每次窗口改变的时候，我们都清除事件，只有当他停下来之后，才会继续执行。这个方法虽然可以解决resize执行多次的问题，但是感觉还不够完美。
    		if(resizeTimer) {
    			clearTimeout(resizeTimer);   // 清除队列
    			console.log('回调函数的队列被清除了');
    		}
    		resizeTimer = setTimeout(this.setSlideshowHeight,100);  //每次窗口变化函数都会被加入队列，但因为有100延迟，下一次窗口再动的时候，之前的函数队列就被清除，直到最后停下来，执行最后一次被加入队列的函数
        }
		this.runInv(); // 相当于js的window.onload，jq的trigger(mouseleave)
	},
	watch: {
	},
	methods: {
		// 为使组件复用，自识别幻灯片尺寸，设置包裹图片的div的高度
		// 图片要有左右切换效果，需设置position:absolute,父元素不能撑开，只能用JS设置为图片高度	
		setSlideshowHeight() {
			let slideshowWidth = document.querySelector('#slideshow').clientWidth;
			let frame = document.querySelector('.slideshow-pics');
			// 宽度可以根据100%自适应，但高度不能，要用js
			// 根据主页面设置的幻灯区宽度获取和图片比例计算幻灯区高度
			frame.style.height = this.imgScale * slideshowWidth + 'px';
		},
		getImageNaturalSize(img) {
			let imgNaturalSize = {};
			if(img.naturalHeight && img.naturalWidth) {
			    imgNaturalSize.height = img.naturalHeight;
			    imgNaturalSize.width = img.naturalWidth;
			}
			else {
				let _img = new Img();
				_img.src = img.src;
				imgNaturalSize.height = _img.naturalHeight;
				imgNaturalSize.width = _img.naturalWidth;
			}
			return imgNaturalSize;
		},
		gotoPic(index) {
			if(this.currentIndex === 0 && index === this.pictures.length -1) {
				this.timing = "0s";
			}
			else if (this.currentIndex === this.pictures.length - 1 && index === 0) {
				this.timing = "0";  
				// 如果设为0，变化突兀；如果大于0，会切换两个图片
			}
			else {
				this.timing = "1s";
			}
			this.currentIndex = index;
			let frameWidth = document.querySelector('.slideshow-pics').clientWidth;
			let slidePics = document.querySelector('.slideshow-pics>ul');
			// 如果使用transition:left/.style.left，存在bug
			slidePics.style.transition = 
			'transform ' + this.timing + ' ease';
			slidePics.style.transform = 'translateX(' + (-frameWidth * index) + 'px)';
	    },
	    runInv() {
    	    this.invId = setInterval(() => {
	    		this.gotoPic(this.nextIndex);
    	    },this.interval);
	    },
	    clearInv() {
	    	clearInterval(this.invId);
	    }
    }
}
</script>

<style scoped>
#slideshow {
	position: relative
}
.slideshow-pics {             
    width: 100%;
    height: 100%;
    /*height: js设置;*/
	overflow: hidden;
	position: relative;
}
.slideshow-pics ul { 
    position: absolute;
    width: 300%;           /* 使图片排成一行 */
}
.slideshow-pics li {
	float: left;
	width: 33.333333%;    /* 使宽度等于窗口(.slideshow-pics)宽度*/
	line-height: 0;       /* 消除图片下方间隙 */
}
.slideshow-pics img {
	max-width: 100%;          /* 随着窗口缩放 */
}
.pre-button,
.next-button {
	position: absolute;
    top: 0;
    width: 5%;
    height: 100%;
    text-indent: 100%;        /*略去文字显示*/
    overflow: hidden;
    background: #ccc;
    opacity:0.7;
}
.pre-button {
	left: 0;
}
.next-button {
	right: 0;
}
.pre-button:after,
.next-button:after {
	position: absolute;
	left: 0;
	top: 50%;
	transform: translateY(-50%);
	width: 100%;             /* 伪元素不是block，但可以设置宽度等于父元素100% */
	font-size: 50px;
	text-indent: 0;
	text-align: center;
	color: #fff;
} 
.pre-button:after {
    content: "\FF1C";
}
.next-button:after {
    content: "\FF1E";
}
.choose-button {
	position: absolute;
	left: 5%;
	bottom: 0;
	transform: translateY(150%);   /* 移到幻灯窗底部 */
	/*-webkit-transform: translateY(111%);*/
	/*-ms-transform: translateY(100%);*/
}
.choose-button li {
	display: inline-block;
	vertical-align: top;
	padding: 0 15px;
	font: 13px/1 "Tahoma";
	border-right: 1px dotted #ccc;
	cursor: pointer;
}
.choose-button li:last-child {
	border-right: 0;
}
.choose-button-selected:before {
    
}
.choose-button-selected {
    border-bottom: 2px solid blue;
}
</style>