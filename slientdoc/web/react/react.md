<!--
 * @Descripttion: 
 * @version: 
 * @Author: suckson
 * @Date: 2019-09-29 00:14:37
 * @LastEditors: suckson
 * @LastEditTime: 2019-10-17 23:21:46
 -->
### react概念

* props  
  - 组件就像一个函数一样，属性是外部传入的，不可随意更改

* State
  - State是供组件私有。状态是可以改变的，但是不能随意改变，唯一改变的方法就是调用setState方法。
  ```js
class Clock extends React.Component {
 constructor(props) {
    super(props);
  }
  render () {
    return (
      <div>
        <h1>hello</h1>
         <p>{this.props.data.toLocaleTimeString()}</p>
      </div>
    )
  }
}

function time(){
  ReactDOM.render(
   <Clock data={new Date()}/>,
    document.getElementById('root')
  )
}
setInterval(time, 1000);
 ```

!> this.increaseLikes.bind(this) 才能指向正确的类，因为默认的function没有this
或者可以使用见通用函数onClick = {() => { this.increaseLikes }}


* React生命周期
1. `componentDidMount()` 方法会在组件已经被渲染到 DOM 中后运行，所以，最好在这里设置计时器：
2. `componentWillUnmount()` 生命周期方法中清除计时器

```js
class Clock extends React.Component {
 constructor(props) {
    super(props);
    this.state = {date: new Date()}
  }
  componentDidMount(){ //添加定时器
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
 componentWillUnmount(){  // 组件销毁移除定时器
   this.clearInterval(this.tick())
  }
  tick(){
   this.setState({
     date: new Date()
   })
  }
  render () {
    return (
      <div>
        <h1>hello</h1>
         <p>{this.state.date.toLocaleTimeString()}</p>
      </div>
    )
  }
}
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
)
```
<p>声明周期的经典使用方法</p>

* Forms（表单元素 ）


