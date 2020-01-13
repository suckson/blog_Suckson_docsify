<!--
 * @Descripttion: 
 * @version: 
 * @Author: suckson
 * @Date: 2019-10-01 23:11:20
 * @LastEditors  : suckson
 * @LastEditTime : 2020-01-13 16:03:24
 -->
<p class="mystylefont1" style="font-size:20px;">Suckson-player</p>

<div class="alert fade alert-simple alert-success alert-dismissible text-left font__family-montserrat font__size-16  font__weight-light brk-library-rendered rendered show">
    <span class="sr-only">Close</span> 
    <i class="start-icon far fa-check-circle faa-tada animated"></i>
   很多时候我们爱上一首歌，是因为歌中的某句歌词唱的就是你。
   即便在乐曲结束之后，它仍继续栖息于体内，永不湮逝
  </div>
<p>&nbsp;</p>

<div id="aplayer">

</div>
<script>
   const ap = new APlayer({
    container: document.getElementById('aplayer'),
    autoplay: true,
    theme: '#06ce48',
    loop: 'all',
    order: 'random',
    preload: 'auto',
    volume: 0.7,
    mutex: true,
    listFolded: false,
    listMaxHeight: "453px",
    lrcType: 3,
    audio: MusicList
  });
</script>
<!-- 

#### [《hey jude》](http://www.kuwo.cn/yinyue/8379114) `披头士的经典`
  >这是甲壳虫乐队的paul给约翰列依的儿子judy写的歌，约翰列依和老婆离婚了，paul喜欢judy害怕他的成长因为家庭变故受到影响，写了这首歌鼓励他的。伦敦奥运会开幕式全场高唱这首歌，激动人心.

#### [《传奇》](http://www.kuwo.cn/play_detail/892063) `王菲`
  >天籁之音的经典，如同百灵鸟般的歌喉，道出了世上最深的思念。

#### [《岛歌》](http://www.kuwo.cn/yinyue/555292) `汤旭`
  >如果可以的话，我想安安静静的呆在你的身边。
  
#### [《侧脸》](http://www.kuwo.cn/yinyue/40492248) `雨果`
  >曾经是心心念念随随便便深深浅浅，爱上了不语不言不计前嫌不知疲倦。我知道从一开始随随便便深深浅浅不过是爱的自由不计前嫌不知疲倦

#### [《像鱼》](http://www.kuwo.cn/yinyue/59166693) `王贰浪`
  >简简单单的歌词，写尽了痴情人的失魂落魄。心里没你的人，就忘掉吧，你掏出一颗心，却换不回一份真，却得不到一份爱，又何必难为别人，陪上笑脸又搭上尊严。
  
#### [《可能否》](http://www.kuwo.cn/play_detail/48513005) `木小雅`
  >明明是干净素雅的女声，却在温柔之中自有倔强与坚定。可能我撞了南墙才会回头吧，可能我见了黄河才会死心吧，可能我偏要一条路走到黑吧，可能我还没遇见 那个他吧~

#### [Five Hundred Miles](http://www.kuwo.cn/yinyue/3617530)
  >适合这样的周五下午，泡一杯秋梨膏，白日梦里摇曳在烛光晚餐和光影交错的宴会，拳脚在期待着下班给冬日的阳光一个大大的拥抱。~

#### [Monsters](http://www.kuwo.cn/yinyue/5651795)
  >没有一个人是永久的潇洒 脑海里总会出现三个字 为什么 不解的表情 不解的心情 疯狂猜图些什么……~

#### [Come And Get Your Love](http://www.kuwo.cn/yinyue/6107598) -->