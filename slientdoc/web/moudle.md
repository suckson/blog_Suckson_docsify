### **浅谈模块化在web设计中的探索与实践**

> 摘要:
>> 伴随着vue等前端框架的流行，前端工程越来越像后端java，C#、等后端工程一样，越来越提倡精简功能。分装代码。而node的兴起，无疑是带来了革命性的巨变，使用node之上的webpack等构建工具开发前端应用，我们可以嗅探我们的代码逻辑，最后打包属于我们应用的js，css。而不必像传统的web应用那样引入很多的js css。增加页面的不可维护性。本论述就在传统的前端工程基础上，详细论述一款音乐播放器APP在新的web开发模式下如何实现，优化上架的过程。探索模块化在web应用中的优势

######  关键词：<font color="#ersdsf">ES6  Webpack  NodeJs   模块化开发</font> 


一、简述设计模式
二、js的趋势  ES6与node带来的前端革命
三、主流的打包技术 webpack   和MVVM框架（vue  react  angular）的潮流
五、利用webpack实现一个todu网页应用（服务器发布）和音乐App（快速开发，兼顾ios 和android平台）
六、总结（未来展望）
1、简述设计模式
    软件行业，MVC,MVP,MVVM是三种常见的软件架构模式(Architectural Pattern),它通过分离关注点来改进代码组织方式。不同于设计模式(Design Pattern),只是为了解决一类问题而总结出的抽象方法，一种架构模式往往能使用多种设计模式。
    MVC模式是MVP,MVVM模式的基础，这两种模式更像是MVC模式的优化改良版,他们三个的MV即Model，view相同，不同的是MV之间的纽带部分。本文主要介绍MVC与MVVM的应用与区别，因为MVP不是很常用。
1.1简介一下MVC：
   MVC允许在不改变视图的情况下改变视图对用户输入的响应方式，用户对View的操作交给了Controller处理，在Controller中响应View的事件调用Model的接口对数据进行操作，一旦Model发生变化便通知相关视图进行更新。例如下backbone框架，它是一个轻量级前端MVC框架，用于结构化管理页面中大量的js（就是管理大量js文件的项目更适用），建立与服务器，视图间的无缝连接，为构建复杂应用提供基础架构。backbone里面包含Model，View，Collection，Router等模块。这里的Model和View与MVC模式的Model和View有区别，我们先看案例：
 
这里Model的对象不只包含数据，也有对属性（name）的监听事件。所以backbone里的Model也不是纯Model，它有一部分Controller的功能。  
可以看出，backbone这样的MVC框架，Model和View的概念很突出，Controller主要放在了View里面。这种模式更好理解，Model看成模型，View看成这个模型的视图化体现，而Controller根据需要写在各自的方法里。这么一看MVC还是挺好的，那为什么有MVVM这种改良版本呢？
  1.2MVVM
    MVVM与MVC最大的区别就是：它实现了View和Model的自动同步，也就是当Model的属性改变时，我们不用再自己手动操作Dom元素，来改变View的显示，而是改变属性后该属性对应View层显示会自动改变。非常的神奇这里我们拿典型的MVVM模式的代表Vue来举例  

 这里的html部分相当于View层，可以看到这里的View通过通过模板语法来声明式的将数据渲染进DOM元素，当ViewModel对Model进行更新时，通过数据绑定更新到View。
 Vue实例中的data相当于Model层，而ViewModel层的核心是Vue中的双向数据绑定，即Model变化时VIew可以实时更新，View变化也能让Model发生变化。
整体看来，MVVM比MVC精简很多，不仅简化了业务与界面的依赖，还解决了数据频繁更新的问题，不用再用选择器操作DOM元素。因为在MVVM中，View不知道Model的存在，Model和ViewModel也观察不到View，这种低耦合模式提高代码的可重用性。
1. 3 对于mvc和mvvm的总结
上述的分析我们可以清楚的认识到，一款优质的应用如果采用传统的MVC模式去开发，就会增加不必要的复杂性，增加我们的维护量。而本节论文主要想分析模块化在前端的开发中的应用，所以我们自然要选择一种流行的MVVM，目前比较成熟的MVVM有很多，诸如VUE、angular、react、alvong等等，我们选取的是现在最流行的vue作为我们的技术栈。
附加一下文案参考
http://www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html
    2 JS 的趋势 和ES6与node带来的前端革命
提到模块化不能不说到CommonJS和AMD， CommonJS 通过定义处理许多常见应用程序需求的API来填补这一空白，最终提供与Python，Ruby和Java一样丰富的标准库。目的是应用程序开发人员能够使用CommonJS API编写应用程序，然后跨不同的JavaScript解释器和主机环境运行该应用程序。同时，美国程序员Ryan Dahl创造了node.js项目，将javascript语言用于服务器端编程，node.js是对commonJS规范的实现。
 
浏览器不兼容CommonJS的根本原因，在于缺少四个Node.js环境的变量。上面代码向一个立即执行函数提供 module 和 exports 两个外部变量，模块就放在这个立即执行函数里面。模块的输出值放在 module.exports 之中，这样就实现了模块的加载。
2.1  AMD规范
AMD就只有一个接口：define(id?,dependencies?,factory);它要在声明模块的时候制定所有的依赖(dep)，并且还要当做形参传到factory中，像这样：
 
这里有define，把东西包装起来，那Node实现中怎么没看到有define关键字呢，它也要把东西包装起来呀，其实吧，只是Node隐式包装了而已.....：

2.2 Webpack 构件工具
Webpack是现在最流行的前端打包工具。webpack并不强制你使用某种模块化方案，而是通过兼容所有模块化方案让你无痛接入项目。有了webpack，你可以随意选择你喜欢的模块化方案，至于怎么处理模块之间的依赖关系及如何按需打包，webpack会帮你处理好的。
Webpack的核心思想：
a ：一切皆模块： 
正如js文件可以是一个“模块（module）”一样，其他的（如css、image或html）文件也可视作模 块。因此，你可以require(‘myJSfile.js’)亦可以require(‘myCSSfile.css’)。这意味着我们可以将事物（业务）分割成更小的易于管理的片段，从而达到重复利用等的目的。
b：按需加载： 
传统的模块打包工具（module bundlers）最终将所有的模块编译生成一个庞大的bundle.js文件。但是在真实的app里边，“bundle.js”文件可能有10M到15M之大可能会导致应用一直处于加载中状态。因此Webpack使用许多特性来分割代码然后生成多个“bundle”文件，而且异步加载部分代码以实现按需加载。
C:文件管理   每个文件都是一个资源，可以用require/import导入js，每个入口文件会把自己所依赖(即require)的资源全部打包在一起，一个资源多次引用的话，只会打包一份对于多个入口的情况，其实就是分别独立的执行单个入口情况，每个入口文件不相干(可用CommonsChunkPlugin优化)
 
                                                              Weback的配置文件
如上图所示，config选项是一个webpack的基本配置，target规定了我们webpack运行的环境，entry字段规定我们应用的入口，表示我们从哪个文件开始嗅探我们的js关系，output字段规定了我们输出的文件路径，文件名等，moudule规定了我们应用使用那些依赖来解析我们应用
项目一：个纯前端构建的一个todo应用（项目已上线todu.suckson.cn）
项目介绍：
Todo是一个简单的在线事务管理，可以方便的记录你的日常事务处理。提供登录注册，记录状态等功能
目录树：
 
附图
项目准备 
1 安装npm nodejs （确认你的开发环境拥有node的开发环境）
2 IDE工具我们用vscode  调试方便  自带命令行
初始化前端工程
1   npm init –yes        这条命令是初始化一个node的工程最开始的他会
2 初始化 项目的基础结构目录


Build  目录 放置 webpack的构建配置   包括生产环境，测试环境，和开发环境，其中webpack.base.js  是webpack在的基本配置，webpack.client.js是在客户端的配置，webpack.client.js是在服务端渲染时的js。Vue.config.js 是Vue程序运行时的配置。
 
 

Client目录放置我们客户端相关的开发配置，assets是静态资源，Components是我们自己封装的业务组件，config目录是我们的前端的路由配置，layout放置我们的公共组件公共区域，store是我们整个应用的服务端的状态管理，

Components  这里我们着重介绍一下组件文件夹以体现前端模块化的开发，在Vue中，我们写的任何html节点都可以封装为组件，在开发时，经常会有多个地方需要相似的页面结构，对于一些重复复用的业务逻辑，我们同样可以通过封装来达到重复利用。
 源码会附加的链接中
<template>
    <div id='app'>
        <div id="cover"></div>
        <Header/>
        <transition name="fade" mode="out-in">
        <router-view />
        </transition>
        <Footer/>
    </div>
</template>
<script>
import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} from 'vuex'
import Header from './layout/haeder.vue'
import Footer from './layout/footer.jsx'
import Todo from './views/todo/todo.vue'
export default {
  name: 'App',
  data () {
    return {
      text: ''
    }
  },
  metaInfo: {
    title: 'suckson Todo'
  },
  components: {
    Header,
    Footer,
    Todo
  },
  methods: {
    ...mapActions(['']),
    ...mapMutations([''])
  },
  mounted () {
    // console.log(this.$store)
    // let i = 1
    // this.$store.dispatch('updateCountAsync', {
    //   num: 10,
    //   time: 1000
    // })
    this.$notify({
      content: 'chaiehng',
      btn: '你好'
    })
  },
  computed: {
    ...mapState(
      {
        Counter: 'count'
      }
    ),
    fullName () {
      return this.$store.getters.fullName
    },
    ...mapGetters
  }
}
</script>
<style lang='stylus' scoped>
#app
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    #cover
        position absolute
        left 0
        right 0
        top 0
        bottom 0   
        background-color #999 
        opacity 0.8
        z-index -1
</style>


在我们的.vue文件中 我们的页面结构全部是放置在templete标签中，所有的业务逻辑是在script标签中，页面样式信息写在css文件中。

另外我想着重介绍的是congfig下的routes.js文件和store下的store.js
Routes是前端的路由，用来在页面地址发生切换时动态的改变页面，store是一个全局的一个状态管理，用户的是否在线，登录登出，是否有权限我们都可以通过Routes文件夹来管理。
最后我们着介绍一下server文件夹，这里是我们服务端渲染的主文件夹，
 
Server.Js会在node端启动一个监听3333端口的服务，然后通过我们的webpack-complier生成一个包含所有数据的String文件，然后这个文件会通过ejs的模板渲染到我们的前端模板。最后供我们用户的访问。

这是一个很清晰的比较小型的前端工程项目，但是麻雀虽小，五脏俱全，里面包含了前端开发的方方面面。依赖、开发环境配置、生产环境配置、解析ES6、服务端渲染、都在我们的项目中分工明确，相互配合。最终打包成我们的应用。
项目二  一个基于Vue的app （suckson-music）
项目介绍：该应用采用了现在最前卫的快速开发技术，采用vue的三驾马车（vue、vuex，vue-rooter）来提供状态管理 数据驱和路由跳转，网页的性能可以媲美原生应用开发，而且由于是H5，少了平台的限制，只要能正常访问我们的网页，就能使用我们的应用。最后，我们再利用Hbuild云端打包，将应用打包为app。，
1 目录结构：
 

在这个应用中整个页面的架构是跟我们的todu差不了太多的，但是这个应用的精华就在与他封装了很多功能行的业务组件，能够很好的体现前端模块化

a、	播放器内核：
 
<template>
	  <div class="player" v-show="playList.length > 0">
	    <transition name="normal"
	      @enter="enter"
	      @after-enter="afterEnter"
	      @leave="leave"
	      @after-leave="afterLeave"
	    >
	      <!--播放页面全屏-->
	      <div class="normal-player" v-show="fullScreen">
	        <!--背景 模糊-->
	        <div class="background">
	          <img :src="currentSong.image" alt="" width="100%" height="100%">
	        </div>
	        <!--顶部-->
	        <div class="top">
	          <div class="back" @click="back">
	            <i class="icon-back"></i>
	          </div>
	          <h1 class="title" v-html="currentSong.name"></h1>
	          <h2 class="subtitle" v-html="currentSong.singer"></h2>
	        </div>
	        <!--中间cd部分-->
	        <div class="middle" 
	          @touchstart.prevent="middleTouchStart"
	          @touchmove.prevent="middleTouchMove"
	          @touchend="middleTouchEnd"
	        >
	          <div class="middle-l" ref="middleL">
	            <div class="cd-wrapper" ref="cdWrapper">
	              <div class="cd" :class="cdCls">
	                <img :src="currentSong.image" alt="" class="image">
	              </div>
	            </div>
	            <div class="playing-lyric-wrapper">
	              <div class="playing-lyric">
	                {{playingLyric}}
	              </div>
	            </div>
	          </div>
	          <!--歌词滚动-->
	          <scroll class="middle-r" ref="lyriclist" :data="currentLyric && currentLyric.lines">
	            <div class="lyric-wrapper">
	              <div v-if="currentLyric">
	                <p ref="lyricLine" 
	                  class="text" 
	                  v-for="(line, index) in currentLyric.lines" 
	                  :key="line.key"
	                  :class="{'current': currentLineNum === index}"
	                >
	                  {{line.txt}}
	                </p>
	              </div>
	            </div>
	          </scroll>
	        </div>
	        <!--底部按钮控制部分-->
	        <div class="bottom">
	          <div class="dot-wrapper">
	            <span class="dot" :class="{'active' : currentShow === 'cd'}"></span>
	            <span class="dot" :class="{'active' : currentShow === 'lyric'}"></span>
	          </div>
	          <div class="progress-wrapper">
	            <span class="time time-l">
	              {{format(currentTime)}}
	            </span>
	            <!--播放进度条-->
	            <div class="progress-bar-wrapper">
	              <progress-bar :percent="percent" @percentChange="onProgressBarChange"></progress-bar>
	            </div>
	            <span class="time time-r">
	              {{format(currentSong.duration)}}
	            </span>
	          </div>
	          <div class="operators">
	            <div class="icon i-left" @click="changeMode">
	              <i :class="iconMode"></i>
	            </div>
	            <div class="icon i-left" :class="disableCls">
	              <i class="icon-prev" @click="prev"></i>
	            </div>
	            <div class="icon i-center" :class="disableCls">
	              <i :class="playIcon" @click="togglePlaying"></i>
	            </div>
	            <div class="icon i-right" :class="disableCls">
	              <i class="icon-next" @click="next"></i>
	            </div>
	            <div class="icon i-right">
	              <i 
	                @click="toggleFavorite(currentSong)" 
	                class="icon" 
	                :class="getFavoriteIcon(currentSong)"
	              >
	              </i>
	            </div>
	          </div>
	        </div>
	      </div>
	    </transition>
	    <!--播放页面小屏 底部-->
	    <transition name="mini">
	      <div class="mini-player" v-show="!fullScreen" @click="open">
	        <div class="icon">
	          <img alt="" :src="currentSong.image" width="40" height="40" :class="cdCls">
	        </div>
	        <div class="text">
	          <h2 class="name" v-html="currentSong.name"></h2>
	          <p class="desc" v-html="currentSong.singer"></p>
	        </div>
	        <div class="control">
	          <!--阻止冒泡-->
	          <progress-circle :radius="radius" :percent="percent">
	            <i @click.stop="togglePlaying" class="icon-mini" :class="miniIcon"></i>
	          </progress-circle>
	        </div>
	        <div class="control" @click.stop="showPlayList">
	          <i class="icon-playlist"></i>
	        </div>
	      </div>
	    </transition>
	    <play-list ref="playList"></play-list>
	    <audio :src="currentSong.url" 
	      ref="audio" 
	      @play="ready" 
	      @error="error"
	      @timeupdate="updateTime"
	      @ended="ended"
	    >
	    </audio>
	  </div>
	</template>
	<script>
	  import { mapGetters, mapMutations, mapActions } from 'vuex'
	  import { prefixStyle } from 'common/js/dom'
	  import ProgressBar from 'base/progressBar/progressBar'
	  import animations from 'create-keyframe-animation'
	  import ProgressCircle from 'base/progressCircle/progressCircle'
	  import { playMode } from 'common/js/config'
	  import Lyric from 'lyric-parser'
	  import Scroll from 'base/scroll'
	  import PlayList from 'base/playList/playList'
	  import { playerMixin } from 'common/js/mixin'
	
	  const transform = prefixStyle('transform')
	  const transitionDuration = prefixStyle('transitionDuration')
	  export default {
	    mixins: [playerMixin],
	    data() {
	      return {
	        songReady: false,
	        currentTime: 0,
	        radius: 32,
	        currentLyric: null,
	        currentLineNum: 0,
	        currentShow: 'cd',
	        playingLyric: ''
	      }
	    },
	    components: {
	      ProgressBar,
	      ProgressCircle,
	      Scroll,
	      PlayList
	    },
	    // 滑动touch
	    created() {
	      this.touch = {}
	    },
	    // 填充歌曲信息 控制歌曲播放
	    computed: {
	      cdCls() {
	        return this.playing ? 'play' : 'pause'
	      },
	      playIcon() {
	        return this.playing ? 'icon-pause' : 'icon-play'
	      },
	      miniIcon() {
	        return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
	      },
	      disableCls() {
	        return this.songReady ? '' : 'disable'
	      },
	      percent() {
	        return this.currentTime / this.currentSong.duration
	      },
	      iconMode() {
	        return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
	      },
	      ...mapGetters([
	        'fullScreen',
	        'playing',
	        'currentIndex'
	      ])
	    },
	    watch: {
	      currentSong(newSong, oldSong) {
	        // 当列表没有歌曲时 直接return
	        if (!newSong.id) return
	
	        if (newSong === oldSong) {
	          return
	        }
	
	        // 防止歌词切换跳动
	        if (this.currentLyric) {
	          this.currentLyric.stop()
	        }
	        clearTimeout(this.timer)
	        this.timer = setTimeout(() => {
	          this.$refs.audio.play()
	          this.getLyric()
	        }, 1000)
	      },
	      playing(newPlaying) {
	        const audio = this.$refs.audio
	        this.$nextTick(() => {
	          newPlaying ? audio.play() : audio.pause()
	        })
	      }
	    },
	    methods: {
	      // 监听progressBar派发的事件
	      onProgressBarChange(percent) {
	        const currentTime = this.currentSong.duration * percent
	        this.$refs.audio.currentTime = currentTime
	        if (!this.playing) {
	          this.togglePlaying()
	        }
	        // 点击或滑动 歌曲进度条 歌词滚动到对应的位置
	        if (this.currentLyric) {
	          this.currentLyric.seek(currentTime * 1000)
	        }
	      },
	      updateTime(e) {
	        this.currentTime = e.target.currentTime
	      },
	      // 格式化时间
	      format(interval) {
	        interval = interval | 0
	        const minute = interval / 60 | 0
	        const second = this._pad(interval % 60)
	        return `${minute}:${second}`
	      },
	      _pad(num, n = 2) {
	        let len = num.toString().length
	        while (len < n) {
	          num = '0' + num
	          len++
	        }
	        return num
	      },
	      // 解析歌词 使用lyric-parser库
	      getLyric() {
	        this.currentSong.getLyric().then(lyric => {
	          this.currentLyric = new Lyric(lyric, this.handleLyric)
	          if (this.playing) {
	            this.currentLyric.play()
	          }
	        }).catch(() => {
	          this.currentLyric = null
	          this.currentLineNum = 0
	          this.playingLyric = ''
	        })
	      },
	
	      handleLyric({lineNum, txt}) {
	        this.currentLineNum = lineNum
	        if (lineNum > 5) {
	          let lineEl = this.$refs.lyricLine[lineNum - 5]
	          this.$refs.lyriclist.scrollToElement(lineEl, 1000)
	        } else {
	          this.$refs.lyriclist.scrollTo(0, 0, 1000)
	        }
	        this.playingLyric = txt
	      },
	      // 防止快速点击 产生错误
	      ready() {
	        this.songReady = true
	        this.savePlayHistory(this.currentSong)
	      },
	      error() {
	        this.songReady = true
	      },
	      // 歌曲前进后退
	      prev() {
	        if (!this.songReady) {
	          return
	        }
	        if (this.playList.length === 1) {
	          this.loop()
	        } else {
	          let index = this.currentIndex - 1
	          if (index === -1) {
	            index = this.playList.length - 1
	          }
	          this.setCurrentIndex(index)
	          if (!this.playing) {
	            this.togglePlaying()
	          }
	        }
	        this.songReady = false
	      },
	      next() {
	        if (!this.songReady) {
	          return
	        }
	        // 列表只有一首歌曲则单曲循环
	        if (this.playList.length === 1) {
	          this.loop()
	        } else {
	          let index = this.currentIndex + 1
	          if (index === this.playList.length) {
	            index = 0
	          }
	          this.setCurrentIndex(index)
	          if (!this.playing) {
	            this.togglePlaying()
	          }
	        }
	        this.songReady = false
	      },
	      ended() {
	        if (this.mode === playMode.loop) {
	          this.loop()
	        } else {
	          this.next()
	        }
	      },
	      loop() {
	        this.$refs.audio.currentTime = 0
	        this.$refs.audio.play()
	
	        // 循环播放 歌词回到开始的时候
	        if (this.currentLyric) {
	          this.currentLyric.seek(0)
	        }
	      },
	      back() {
	        this.setFullScreen(false)
	      },
	      open() {
	        this.setFullScreen(true)
	      },
	      // 设置playing状态 watch playing的变化 实现播放暂停
	      togglePlaying() {
	        if (!this.songReady) {
	          return
	        }
	        this.setPlayingState(!this.playing)
	
	        // 歌词随着歌曲播放暂停而滚动或暂停滚动
	        if (this.currentLyric) {
	          this.currentLyric.togglePlay()
	        }
	      },
	
	      middleTouchStart(e) {
	        this.touch.initiated = true
	        // 用来判断是否是一次移动
	        this.touch.moved = false
	        const touch = e.touches[0]
	        this.touch.startX = touch.pageX
	        this.touch.startY = touch.pageY
	      },
	      middleTouchMove(e) {
	        // 没有touchstart 返回
	        if (!this.touch.initiated) {
	          return
	        }
	        const touch = e.touches[0]
	        const deltaX = touch.pageX - this.touch.startX
	        const deltaY = touch.pageY - this.touch.startY
	        // y轴距离大于x轴距离 => 纵向滚动 => 返回
	        if (Math.abs(deltaY) > Math.abs(deltaX)) {
	          return
	        }
	        if (!this.touch.moved) {
	          this.touch.moved = true
	        }
	        const left = this.currentShow === 'cd' ? 0 : -window.innerWidth
	        // 滚动的距离  最大是0
	        const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX))
	        this.touch.percent = Math.abs(offsetWidth / window.innerWidth)
	        this.$refs.lyriclist.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`
	        this.$refs.lyriclist.$el.style[transitionDuration] = 0
	        this.$refs.middleL.style.opacity = 1 - this.touch.percent
	        this.$refs.middleL.style[transitionDuration] = 0
	      },
	      middleTouchEnd() {
	        if (!this.touch.moved) {
	          return
	        }
	        let offsetWidth
	        let opacity
	        if (this.currentShow === 'cd') {
	          if (this.touch.percent > 0.1) {
	            offsetWidth = -window.innerWidth
	            opacity = 0
	            this.currentShow = 'lyric'
	          } else {
	            offsetWidth = 0
	            opacity = 1
	          }
	        } else {
	          if (this.touch.percent < 0.9) {
	            offsetWidth = 0
	            this.currentShow = 'cd'
	            opacity = 1
	          } else {
	            offsetWidth = -window.innerWidth
	            opacity = 0
	          }
	        }
	        // 动画缓冲时间
	        const time = 300
	        this.$refs.lyriclist.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`
	        this.$refs.lyriclist.$el.style[transitionDuration] = `${time}ms`
	        this.$refs.middleL.style.opacity = opacity
	        this.$refs.middleL.style[transitionDuration] = `${time}ms`
	        this.touch.initiated = false
	      },
	
	      // vue transition 动画钩子
	      enter(el, done) {
	        const {x, y, scale} = this._getPosAndScale()
	
	        let animation = {
	          0: {
	            transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
	          },
	          60: {
	            transform: `translate3d(0,0,0) scale(1.1)`
	          },
	          100: {
	            transform: `translate3d(0,0,0) scale(1)`
	          }
	        }
	
	        animations.registerAnimation({
	          name: 'move',
	          animation,
	          presets: {
	            duration: 400,
	            easing: 'linear'
	          }
	        })
	
	        animations.runAnimation(this.$refs.cdWrapper, 'move', done)
	      },
	      afterEnter() {
	        animations.unregisterAnimation('move')
	        this.$refs.cdWrapper.style.animation = ''
	      },
	      leave(el, done) {
	        this.$refs.cdWrapper.style.transition = 'all 0.4s'
	        const {x, y, scale} = this._getPosAndScale()
	        this.$refs.cdWrapper.style[transform] = `translate3d(${x}px,${y}px,0) scale(${scale})`
	        this.$refs.cdWrapper.addEventListener('transitionend', done)
	      },
	      afterLeave() {
	        this.$refs.cdWrapper.style.transition = ''
	        this.$refs.cdWrapper.style[transform] = ''
	      },
	      // vue transition 动画钩子结束
	
	      // 获取动画起始位置
	      _getPosAndScale() {
	        // 左下角小图片初始位置
	        const targetWidth = 40
	        const paddingLeft = 40
	        const paddingBottom = 30
	        // 中间大图片距离顶部位置
	        const paddingTop = 80
	        // 中间图片宽度
	        const width = window.innerWidth * 0.8
	        // 缩放尺度
	        const scale = targetWidth / width
	        const x = -(window.innerWidth / 2 - paddingLeft)
	        const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
	        return {
	          x,
	          y,
	          scale
	        }
	      },
	
	      // 歌曲列表
	      showPlayList() {
	        this.$refs.playList.show()
	      },
	
	      ...mapMutations({
	        setFullScreen: 'SET_FULL_SCREEN'
	      }),
	      ...mapActions([
	        'savePlayHistory'
	      ])
	    }
	  }
	</script>
	<style scoped lang="stylus" rel="stylesheet/stylus">
	  @import "~common/stylus/variable"  //导入css 文件等样式信息
	  @import "~common/stylus/mixin"
	

B、歌曲列表的懒加载
<template>
	  <div class="music-list">
	    <!--返回上一层-->
	    <div class="back" @click="back">
	      <i class="icon-back"></i>
	    </div>
	    <!--歌曲信息-->
	    <h1 class="title" v-html="title"></h1>
	    <div class="bg-image" :style="bgStyle" ref="bgImage">
	      <div class="play-wrapper">
	        <div ref="playBtn" v-show="songs.length>0" class="play" @click="random">
	          <i class="icon-play"></i>
	          <span class="text">随机播放全部</span>
	        </div>
	      </div>
	    </div>
	    <!--滑动辅助层-->
	    <div class="bg-layer" ref="layer"></div>
	    <!--歌曲列表-->
	    <scroll :data="songs" 
	      @scroll="scroll"
	      :listen-scroll="listenScroll" 
	      :probe-type="probeType" 
	      class="list" 
	      ref="list"
	    >
	      <div class="song-list-wrapper">
	        <song-list 
	          :songs="songs" 
	          :rank="rank" 
	          @select="selectItem"
	        >
	        </song-list>
	      </div>
	      <!--加载loading-->
	      <div v-show="!songs.length" class="loading-container">
	        <loading></loading>
	      </div>
	    </scroll>
	  </div>
	</template>
	
	<script>
	  import Scroll from 'base/scroll'
	  import Loading from 'base/loading'
	  import SongList from 'base/songList/songList'
	  import {prefixStyle} from 'common/js/dom'
	  import {mapActions} from 'vuex'
	  import {playListMixin} from 'common/js/mixin'
	
	  const RESERVED_HEIGHT = 40
	  const transform = prefixStyle('transform')
	
	  export default {
	    mixins: [playListMixin],
	    props: {
	      bgImage: {
	        type: String,
	        default: ''
	      },
	      songs: {
	        type: Array,
	        default: []
	      },
	      title: {
	        type: String,
	        default: ''
	      },
	      rank: {
	        type: Boolean,
	        default: false
	      }
	    },
	    data() {
	      return {
	        scrollY: 0
	      }
	    },
	    computed: {
	      // 加载歌手背景图片
	      bgStyle() {
	        return `background-image:url(${this.bgImage})`
	      }
	    },
	    created() {
	      this.probeType = 3
	      this.listenScroll = true
	    },
	    // 计算获取背景图片高度 设置scroll的偏移值
	    mounted() {
	      this.imageHeight = this.$refs.bgImage.clientHeight
	      this.minTransalteY = -this.imageHeight + RESERVED_HEIGHT
	      this.$refs.list.$el.style.top = `${this.imageHeight}px`
	    },
	    methods: {
	      // 当底部出现mini播放器的时候 重新计算高度
	      handlePlayList(playlist) {
	        const bottom = playlist.length > 0 ? '60px' : ''
	        this.$refs.list.$el.style.bottom = bottom
	        this.$refs.list.refresh()
	      },
	      scroll(pos) {
	        this.scrollY = pos.y
	      },
	      back() {
	        this.$router.back()
	      },
	      selectItem(item, index) {
	        this.selectPlay({
	          list: this.songs,
	          index
	        })
	      },
	      random() {
	        this.randomPlay({
	          list: this.songs
	        })
	      },
	      ...mapActions([
	        'selectPlay',
	        'randomPlay'
	      ])
	    },
	    watch: {
	      scrollY(newVal) {
	        let translateY = Math.max(this.minTransalteY, newVal)
	        let scale = 1
	        let zIndex = 0
	        const percent = Math.abs(newVal / this.imageHeight)
	        if (newVal > 0) {
	          scale = 1 + percent
	          zIndex = 10
	        }
	
	        this.$refs.layer.style[transform] = `translate3d(0,${translateY}px,0)`
	        if (newVal < this.minTransalteY) {
	          zIndex = 10
	          this.$refs.bgImage.style.paddingTop = 0
	          this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
	          this.$refs.playBtn.style.display = 'none'
	        } else {
	          this.$refs.bgImage.style.paddingTop = '70%'
	          this.$refs.bgImage.style.height = 0
	          this.$refs.playBtn.style.display = ''
	        }
	        // 下拉背景图片伸缩
	        this.$refs.bgImage.style[transform] = `scale(${scale})`
	        this.$refs.bgImage.style.zIndex = zIndex
	      }
	    },
	    components: {
	      Scroll,
	      Loading,
	      SongList
	    }
	  }
	</script>


 



附加一：todu项目的部分源代码（）：
详细源代码请访github：https://github.com/Suckson/todolist-vue-weppack
Webpack.server.js
const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config.base')
const VueClientPlugin = require('vue-server-renderer/client-plugin')
const cdnConfig = require('../app.config').cdn

const isDev = process.env.NODE_ENV === 'development'

const defaultPluins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html')
  }),
  new VueClientPlugin()
]

const devServer = {
  port: 8000,
  host: '0.0.0.0',
  overlay: {
    errors: true
  },
  headers: { 'Access-Control-Allow-Origin': '*' },
  historyApiFallback: {
    index: '/public/index.html'
  },
  proxy: {
    '/api': 'http://127.0.0.1:3333',
    '/user': 'http://127.0.0.1:3333'
  },
  hot: true
}

let config

if (isDev) {
  config = merge(baseConfig, {
    devtool: '#cheap-module-eval-source-map',
    module: {
      rules: [
        {
          test: /\.styl/,
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'stylus-loader'
          ]
        }
      ]
    },
    devServer,
    plugins: defaultPluins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ])
  })
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/client-entry.js'),
      vendor: ['vue']
    },
    output: {
      filename: '[name].[chunkhash:8].js'
    },
    module: {
      rules: [
        {
          test: /\.styl/,
          use: ExtractPlugin.extract({
            fallback: 'vue-style-loader',
            use: [
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              'stylus-loader'
            ]
          })
        }
      ]
    },
    plugins: defaultPluins.concat([
      new ExtractPlugin('styles.[contentHash:8].css'),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'runtime'
      }),
      new webpack.NamedChunksPlugin()
    ])
  })
}

config.resolve = {
  alias: {
    'model': path.join(__dirname, '../client/model/client-model.js')
  }
}

module.exports = config


notify.vue
<template>
<transition name="fade">
    <div class="notification" :style="style">
        <span class="content">{{content}}</span>
        <a class="btn" @click="handleClick">{{btn || '关闭'}}</a>
    </div>
</transition>
</template>
<script>
export default {
  name: 'Notification',
  props: {
    content: {
      type: String,
      required: true
    },
    btn: {
      type: String,
      default: '关闭'
    }
  },
  computed: {
    style: {}
  },
  methods: {
    handleClose (e) {
      e.preventDefault()
      this.$emit('close')
    }
  }
}
</script>
<style lang="stylus" scoped>
.notification
  display: inline-flex
  background-color #303030
  color rgba(255, 255, 255, 1)
  align-items center
  padding 20px
  min-width 280px
  box-shadow 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)
  flex-wrap wrap
  transition all .3s
.content
  padding 0
.btn
  color #ff4081
  padding-left 24px
  margin-left auto
  cursor pointer
</style>



Routes.js
// import Todo from '../views/todo/todo.vue'
// import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    name: 'path',
    redirect: '/app'
  },
  {
    path: '/app',
    name: 'app',
    component: () => import('../views/todo/todo.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue')
  }

Create-app.js(服务端负责引入vue应用)   
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import App from './app.vue'
import createStore from './store/store'
import createRouter from './config/router'
import Notification from './components/notification'
import Meta from 'vue-meta'

import './assets/style/global.styl'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Meta)
Vue.use(Notification)
export default () => {
  const router = createRouter()
  const store = createStore()
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  return { app, router, store }
}


Server.js（服务端渲染主文件）
const Koa = require('koa')
const send = require('koa-send')
const path = require('path')
const koaBody = require('koa-body')
const koaSession = require('koa-session')
const apiRouter = require('./rooters/api')
const staticRouter = require('./rooters/static')
const app = new Koa()
app.use(koaSession({
  key: 'v-ssr-id',
  maxAge: 2 * 60 * 60 * 1000
}, app))

const isDev = process.env.NODE_ENV === 'development'

app.use(async (ctx, next) => {
  try {
    console.log(`request with path ${ctx.path}`)
    await next()
  } catch (err) {
    console.log(err)
    ctx.status = 500
    if (isDev) {
      ctx.body = err.message
    } else {
      ctx.bosy = 'please try again later'
    }
  }
})

app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    await send(ctx, '/favicon.ico', { root: path.join(__dirname, '../') })
  } else {
    await next()
  }
})

app.use(koaBody())
app.use(apiRouter.routes()).use(apiRouter.allowedMethods())
app.use(staticRouter.routes()).use(staticRouter.allowedMethods())

let pageRouter
if (isDev) {
  pageRouter = require('./rooters/dev-ssr')
} else {
  pageRouter = require('./rooters/ssr')
}
app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3333

app.listen(PORT, HOST, () => {
  console.log(`server is listening on ${HOST}:${PORT}`)
})


Package.json
{
  "name": "todolist",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build:client": "cross-env NODE_ENV=production webpack --config build/webpack.config.client.js",
    "build:server": "cross-env NODE_ENV=production webpack --config build/webpack.config.server.js",
    "build": "npm run clean && npm run build:client && npm run build:server",
    "clean": "rimraf public && rimraf server-build",
    "lint": "eslint --ext .js --ext .jsx --ext .vue client/ build/",
    "lint-fix": "eslint --fix --ext .js --ext .jsx --ext .vue client/ build/",
    "precommit": "npm run lint-fix",
    "practice": "cross-env NODE_ENV=development webpack-dev-server --config build/webpack.config.practice.js",
    "dev:client": "cross-env NODE_ENV=development webpack-dev-server --config build/webpack.config.client.js",
    "dev:server": "nodemon server/server.js",
    "dev": "concurrently \"npm run dev:client\" \"npm run dev:server\"",
    "start":"cross-env NODE_ENV=production node server/server.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "axios": "^0.17.1",
    "ejs": "^2.5.7",
    "koa": "^2.4.1",
    "koa-body": "^2.5.0",
    "koa-router": "^7.4.0",
    "koa-send": "^4.1.2",
    "koa-session": "^5.8.1",
    "sha1": "^1.1.1",
    "vue": "2.5.13",
    "vue-meta": "^1.4.3",
    "vue-router": "^3.0.1",
    "vue-server-renderer": "^2.5.13",
    "vuex": "^3.0.1"
  },
  "devDependencies": {
    "autoprefixer": "7.2.3",
    "babel-core": "6.26.0",
    "babel-eslint": "^8.2.1",
    "babel-helper-vue-jsx-merge-props": "2.0.3",
    "babel-loader": "7.1.2",
    "babel-plugin-syntax-dynamic-import": "^6.18.0",
    "babel-plugin-syntax-jsx": "6.18.0",
    "babel-plugin-transform-vue-jsx": "3.5.0",
    "babel-preset-env": "1.6.1",
    "babel-preset-stage-1": "^6.24.1",
    "concurrently": "^3.5.1",
    "cross-env": "5.1.3",
    "css-loader": "0.28.7",
    "eslint": "^4.16.0",
    "eslint-config-standard": "^11.0.0-beta.0",
    "eslint-loader": "^1.9.0",
    "eslint-plugin-html": "^4.0.1",
    "eslint-plugin-import": "^2.8.0",
    "eslint-plugin-node": "^5.2.1",
    "eslint-plugin-promise": "^3.6.0",
    "eslint-plugin-standard": "^3.0.1",
    "extract-text-webpack-plugin": "3.0.2",
    "file-loader": "1.1.6",
    "html-loader": "^0.5.5",
    "html-webpack-plugin": "^2.30.1",
    "husky": "^0.14.3",
    "memory-fs": "^0.4.1",
    "nodemon": "^1.14.12",
    "postcss-loader": "2.0.9",
    "qiniu": "^7.1.2",
    "rimraf": "^2.6.2",
    "style-loader": "0.19.1",
    "stylus": "0.54.5",
    "stylus-loader": "3.0.1",
    "url-loader": "0.6.2",
    "vue-loader": "13.6.0",
    "vue-style-loader": "^3.0.3",
    "vue-template-compiler": "2.5.13",
    "webpack": "3.10.0",
    "webpack-dev-server": "2.9.7",
    "webpack-merge": "^4.1.1"
  }
}



附加二：suckson-Music的附加源码：
详细源码请访问：https://github.com/Suckson/Vue-music
Package.json（项目的所有依赖  指令   构建说明）
{
  "name": "vue-music",
  "version": "1.0.0",
  "description": "A Vue.js project",
  "author": "k-water <625592890@qq.com>",
  "private": true,
  "scripts": {
    "dev": "node build/dev-server.js --host 192.168.1.105",
    "start": "node build/dev-server.js",
    "build": "node build/build.js",
    "e2e": "node test/e2e/runner.js",
    "test": "npm run e2e",
    "lint": "eslint --ext .js,.vue src test/e2e/specs"
  },
  "config": {
    "ghooks": {
      "commit-msg": "validate-commit-msg"
    }
  },
  "dependencies": {
    "axios": "^0.16.2",
    "babel-polyfill": "^6.23.0",
    "babel-runtime": "^6.23.0",
    "better-scroll": "^0.4.0",
    "create-keyframe-animation": "^0.1.0",
    "fastclick": "^1.0.6",
    "good-storage": "^1.0.1",
    "js-base64": "^2.1.9",
    "jsonp": "^0.2.1",
    "lyric-parser": "^1.0.1",
    "vue": "^2.3.3",
    "vue-lazyload": "^1.0.5",
    "vue-router": "^2.3.1",
    "vuex": "^2.3.1",
    "koa2-cors": "^2.0.6"
  },
  "devDependencies": {
    "autoprefixer": "^6.7.2",
    "babel-core": "^6.22.1",
    "babel-eslint": "^7.1.1",
    "babel-loader": "^6.2.10",
    "babel-plugin-transform-runtime": "^6.22.0",
    "babel-preset-env": "^1.3.2",
    "babel-preset-stage-2": "^6.22.0",
    "babel-register": "^6.22.0",
    "chalk": "^1.1.3",
    "chromedriver": "^2.27.2",
    "connect-history-api-fallback": "^1.3.0",
    "copy-webpack-plugin": "^4.0.1",
    "cross-spawn": "^5.0.1",
    "css-loader": "^0.28.0",
    "eslint": "^3.19.0",
    "eslint-config-standard": "^6.2.1",
    "eslint-friendly-formatter": "^2.0.7",
    "eslint-loader": "^1.7.1",
    "eslint-plugin-html": "^2.0.0",
    "eslint-plugin-promise": "^3.4.0",
    "eslint-plugin-standard": "^2.0.1",
    "eventsource-polyfill": "^0.9.6",
    "express": "^4.14.1",
    "extract-text-webpack-plugin": "^2.0.0",
    "file-loader": "^0.11.1",
    "friendly-errors-webpack-plugin": "^1.1.3",
    "ghooks": "^2.0.0",
    "html-webpack-plugin": "^2.28.0",
    "http-proxy-middleware": "^0.17.3",
    "nightwatch": "^0.9.12",
    "opn": "^4.0.2",
    "optimize-css-assets-webpack-plugin": "^1.3.0",
    "ora": "^1.2.0",
    "rimraf": "^2.6.0",
    "selenium-server": "^3.0.1",
    "semver": "^5.3.0",
    "shelljs": "^0.7.6",
    "stylus": "^0.54.5",
    "stylus-loader": "^3.0.1",
    "url-loader": "^0.5.8",
    "validate-commit-msg": "^2.13.0",
    "vue-loader": "^12.1.0",
    "vue-style-loader": "^3.0.1",
    "vue-template-compiler": "^2.3.3",
    "webpack": "^2.6.1",
    "webpack-bundle-analyzer": "^2.2.1",
    "webpack-dev-middleware": "^1.10.0",
    "webpack-hot-middleware": "^2.18.0",
    "webpack-merge": "^4.1.0"
  },
  "engines": {
    "node": ">= 4.0.0",
    "npm": ">= 3.0.0"
  },
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ]
}



prodServer.js
/* eslint-disable */
var express = require('express')
var config = require('./config/index')
var axios = require('axios')
// var cors = require('koa2-cors')
var port = process.env.PORT || config.build.port

var app = express()

var apiRoutes = express.Router()

apiRoutes.get('/getDiscList', function(req, res) {
  var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.get('/lyric', function(req, res) {
  var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'

  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    var ret = response.data
    if (typeof ret === 'string') {
      var reg = /^\w+\(({[^\(\)]+})\)$/
      var matches = response.data.match(reg)
      if (matches) {
        ret = JSON.parse(matches[1])
      }
    }
    res.json(ret)
  }).catch((e) => {
    console.log(e)
  })
})
app.use('/api', apiRoutes)

app.use(express.static('./dist'))

module.exports = app.listen(port, function(err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})

Api.js（接口请求，与后端交互）

export const commonParams = {
  g_tk: 5381,
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  format: 'jsonp'
}

export const options = {
  param: 'jsonpCallback',
  prefix: 'tan'
}

// 基于jsonp方库，设置自定义的cbname
// 解决cbname未定义的问题
export const options1 = {
  param: 'jsonpCallback',
  prefix: 'playlistinfoCallback'
}
export const ERR_OK = 0


