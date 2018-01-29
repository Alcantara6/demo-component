<template>
    <div id="app">
<!--    <slideshow1 :pictures="pictures"></slideshow1>
        <slideshow2 :pictures="pictures"></slideshow2>  
        <slideshow3 :pictures="pictures"></slideshow3> -->
        <slideshow-final :pictures="pictures"></slideshow-final>

    </div>
</template>

<script>
import slideshow1 from './components/slideshow1'
import slideshow2 from './components/slideshow2'
import slideshow3 from './components/slideshow3'
import slideshowFinal from './components/slideshow-final'

export default {
  name: 'App',
  components: {
    slideshow1,
    slideshow2,
    slideshow3,
    slideshowFinal
  },
  data() {
    return {
      pictures: [
         {
           title: 'DRAW:24 JANUARY',
           img_url: require('./assets/slidepics/1-slidepic.jpg'),
           link: 'https://www.uefa.com/uefanationsleague/news/newsid=2522564.html#uefa+nations+league+draw+seedings'
         },
         {
           title: 'UEFA CLUB LICENSING REPORT',
           img_url: require('./assets/slidepics/2-slidepic.jpg'),
           link: 'https://www.uefa.com/insideuefa/protecting-the-game/club-licensing-and-financial-fair-play/news/newsid=2529909.html#uefa+report+shows+footballs+financial+upswing'
         },
         {
           title: 'WATCH THE FIRST EPISODE NOW',
           img_url: require('./assets/slidepics/3-slidepic.jpg'),
           link: 'https://www.uefa.com/women/news/newsid=2529265.html#uefa+press+play+vlog+series+live'
         }
      ]
    }
  }
}
</script>

<style>
    * {
        margin: 0; 
        padding: 0;
    }
    body {
        font:12px/1.5 Tahoma, Helvetica, Arial, "Microsoft YaHei", "Hiragino GB", Sans-serif;
    }
    ul,ol {
        list-style-type: none;
    }
    a {
        text-decoration: none;
    }
    a:link {
        color: #000;
    }
    a:hover {
        color: #0000A0;
    }
    a:visited {
        text-decoration: underline;
        color: #00F;
    }
    a img, 
    div img {
        vertical-align: top;
    }
    *:before,
    *:after {
        box-sizing: border-box;
    }

    /* 宽度要与图片相等 */
    #slideshow {
        max-width: 1000px;
        margin-bottom: 100px;
    }
</style>
