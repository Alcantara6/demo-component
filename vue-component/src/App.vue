<template>
    <div id="app">
        <slideshow-final :pictures="pictures" :interval="interval"></slideshow-final>

    </div>
</template>

<script>
import slideshowFinal from './components/slideshow-final'

export default {
  name: 'App',
  components: {
    slideshowFinal
  },
  data() {
    return {
      pictures: [
         {
           title: '战争策略3D手游《战地指挥官》给你一场竞技盛宴',
           img_url: require('./assets/slidepics/1.jpg'),
           link: 'http://ku.u.360.cn/raiders.php?wzId=229281&soft_id=3842368'
         },
         {
           title: '《苍狼诀》百变时装系统蓄势待发',
           img_url: require('./assets/slidepics/2.jpg'),
           link: 'http://ng.d.cn/canglangjue/news/detail_543294_1.html'
         },
         {
           title: 'TapTap CJ 抢先知',
           img_url: require('./assets/slidepics/3.jpg'),
           link: 'http://www.sohu.com/a/157624597_535014'
         }
      ],
      interval: 3000
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
        max-width: 100%;
        margin-bottom: 100px;
    }
</style>
