<!--
 * @Descripttion: 
 * @version: 
 * @Author: suckson
 * @Date: 2019-10-01 23:11:20
 * @LastEditors  : suckson
 * @LastEditTime : 2020-01-16 13:57:46
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