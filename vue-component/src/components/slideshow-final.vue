<!-- 不能采用多个元素的过渡方式（transition包裹多个元素，这样的话多个元素不能同时过渡，而是按顺序来） -->
<!-- v-bind transition的name属性，实现不同方式的切换 -->
<!-- rev.2018-2-1: 
runInv内增加幻灯片始终向左滑动的；
点击同一tab，幻灯片不滑动； -->

<template>
	<div id="slideshow" @mouseleave="runInv" @mouseenter="clearInv">
		<div class='slideshow-pics'>
			<a :href="pictures[currentIndex].link">
			    <!-- 不能用v-show，用v-if!!! -->
				<transition :name="transName[0]">	
				<img class="slide-img" v-if="isShow" :src="pictures[currentIndex].img_url" alt="点击查看">
				</transition>
				<transition :name="transName[1]">	
				<img class="slide-img" v-if="!isShow" :src="pictures[currentIndex].img_url" alt="点击查看">
				</transition>
			</a>
		</div>
		<a class="pre-button" @click="gotoPicByPreButton(prevIndex)">previous
		</a>  
		<a class="next-button" @click="gotoPicByNextButton(nextIndex)">next
		</a>
		<div class="choose-button">
			<ul>
				<li v-for="(picture,index) in pictures" @click="gotoPicByTab(index)">
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
      	isShow: true,
      	slideDirection: 'toLeft' 
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
	    },
	    transName() {
	    	if(this.slideDirection === 'toLeft') {
		    	return ['from-right','to-left'];
		    }
		    else if(this.slideDirection === 'toRight')
			    return ['from-left','to-right'];
	    	}
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
			this.isShow = false;        // 显示切换前的图片
			setTimeout(() => {
				this.isShow = true;      // 显示切换后的图片
				this.currentIndex = index;
			},10)
	    },	    
	    gotoPicByNextButton(index) {
	    	this.slideDirection='toLeft';
	    	this.gotoPic(index);
	    },
	    gotoPicByPreButton(index) {
	    	this.slideDirection='toRight';
	    	this.gotoPic(index);
	    },
		gotoPicByTab(index) {
			if(index > this.currentIndex) {
                this.slideDirection = 'toLeft';
			}
			if(index < this.currentIndex) {
				this.slideDirection = 'toRight';
			}
			if(index !== this.currentIndex) {
				this.gotoPic(index);
			}
			else {
				return false;
			}
	    },	    	    
	    runInv() {
    	    this.slideDirection='toLeft';
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
.from-right-enter-active {
	transition: all .5s;
}
.from-right-enter {
	transform: translateX(100%);
}
.to-left-leave-active {
	transition: all .5s;
}
.to-left-leave-to {
	transform: translateX(-100%);
}
.from-left-enter-active {
	transition: all .5s;
}
.from-left-enter {
	transform: translateX(-100%);
}
.to-right-leave-active {
	transition: all .5s;
}
.to-right-leave-to {
	transform: translateX(100%);
}
#slideshow {
    position: relative;            /* 如何解决高度自适应问题 */
}
.slideshow-pics {             
    width: 100%;
    height: 100%;
    /* 子元素为绝对定位，要实现overflow:hidden，父元素要设置relative*/
    position: relative;             
    overflow: hidden;
}
.slideshow-pics img {
	position: absolute;
	width: 100%;      
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
.choose-button li:hover {
	background-color: #e66c2c;
}
</style>