<template>
	<div id="slideshow" @mouseleave="runInv" @mouseenter="clearInv">
		<div class='slideshow-pics'>
			<a :href="pictures[currentIndex].link">
				<transition :name="transName[0]">	
				    <img class="slide-img" v-if="isShow" :src="pictures[currentIndex].img_url" alt="点击查看">
				</transition>
				<transition :name="transName[1]">	
				    <img class="slide-img" v-if="!isShow" :src="pictures[currentIndex].img_url" alt="点击查看">
				</transition>
			</a>
		</div>
		<a class="pre-button" @click="gotoPicByPreButton(prevIndex)">previous</a>  
		<a class="next-button" @click="gotoPicByNextButton(nextIndex)">next</a>
		<div class="choose-button">
			<ul>
				<li v-for="(picture,index) in pictures" @click="gotoPicByTab(index)">
					<span :class="{'choose-button-selected':index === currentIndex}">
					    {{ picture.title }}
					</span>
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

	    // 过渡类名
	    transName() {
	    	if(this.slideDirection === 'toLeft') {
		    	return ['from-right','to-left'];
		    }
		    else if(this.slideDirection === 'toRight') {
			    return ['from-left','to-right'];
		    }
	    },

        // 插入的图片宽高比
	    imgScale() {
	    	let slidePic = document.querySelector('.slideshow-pics img');
	    	return this.getImageNaturalSize(slidePic).height 
	    	    / this.getImageNaturalSize(slidePic).width;
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
    		// 通过增加定时器的方式来让代码延迟执行，解决resize执行多次的问题
    		if(resizeTimer) {
    			clearTimeout(resizeTimer);   // 清除队列
    		}
    		resizeTimer = setTimeout(this.setSlideshowHeight,100);  
        }
        // mounted钩子函数中也要调用,热加载更新时设置，否则高度为0
		this.setSlideshowHeight();
		// 相当于js的window.onload，jq的trigger(mouseleave)
		this.runInv(); 
	},

	methods: {
		// 设置图片窗口的高度
		setSlideshowHeight() {
			let slideshowWidth = document.querySelector('#slideshow').clientWidth;
			let frame = document.querySelector('.slideshow-pics');
			// 根据主页面设置的幻灯区宽度获取图片比例计算幻灯区高度
			frame.style.height = this.imgScale * slideshowWidth + 'px';
		},
		// 获取图片实际尺寸
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

        // 切换图片
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
	    gotoPic(index) {
			this.isShow = false;        // 显示切换前的图片
			setTimeout(() => {
				this.currentIndex = index;
				this.isShow = true;     // 显示切换后的图片
			},10)
	    },
        
        // 自动播放
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
    position: relative;   
}
.slideshow-pics {             
    width: 100%;
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
    opacity:0.5;
    cursor: pointer;
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
	width: 100%;              
	font-size: 50px;
	text-indent: 0;
	text-align: center;
	color: #fff;
} 
.pre-button:after {
    content: "\ff1c";
}
.next-button:after {
    content: "\ff1e";
}

.choose-button {
	position: absolute;
	left: 5%;
	bottom: 0;
	/* 移到幻灯窗底部 */
	-webkit-transform: translateY(120%);
	-ms-transform: translateY(120%);
	transform: translateY(120%);
}
.choose-button li {
	display: inline-block;
	vertical-align: top;
	margin-right: 15px;
	padding-right: 10px;
	font: 13px/1 "Tahoma";
	border-right: 1px dotted #ccc;
	cursor: pointer;
}
.choose-button li:last-child {
	border-right: 0;
}
.choose-button li:hover {
	background-color: #e66c2c;
}
.choose-button-selected {
    border-bottom: 2px solid blue;
}
</style>