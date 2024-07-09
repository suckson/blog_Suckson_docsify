<!--
 * @Descripttion: 
 * @version: 
 * @Author: suckson
 * @Date: 2019-09-02 00:12:39
 * @LastEditors: suckson
 * @LastEditTime: 2019-09-22 21:13:43
 -->
### 关于面向对象 `面向对象是编程的一个重要思维方式`

!> Life was like a box of chocolates, you never know what you're going to get~
<div class="alert alert-success" role="alert">
    程序设计其实是对复杂性的管理，而面向对象是对复杂性最好的抽象。
</div>

上一段最常用的java代码
```java
import java.util.*;
class Student{
    //这里为了方便赋值，减少代码，我就用public了。
    public int id;
    public String name;
    public String banji;
    //重写构造器，方便增加学生
    public int getId(){
        return id;
    }
    //输出学生信息
    public String toString(){
        System.out.println("学号："+id);
        System.out.println("姓名："+name);
        System.out.println("班级："+banji);
    }
}
```



##### 1.面向对象的三大特性

1. 封装
隐藏对象的属性和实现细节，仅对外提供公共访问方式，将变化隔离，便于使用，提高复用性和安全性。

2. 继承
提高代码复用性；继承是多态的前提.

3. 多态
父类或接口定义的引用变量可以指向子类或具体实现类的实例对象。提高了程序的拓展性。


##### 2.五大基本原则：

1. 单一职责原则SRP(Single Responsibility Principle)
类的功能要单一，不能包罗万象，跟杂货铺似的。

2. 开放封闭原则OCP(Open－Close Principle)
一个模块对于拓展是开放的，对于修改是封闭的，想要增加功能热烈欢迎，想要修改，哼，一万个不乐意。

3. 里式替换原则LSP(the Liskov Substitution Principle LSP)
子类可以替换父类出现在父类能够出现的任何地方。比如你能代表你爸去你姥姥家干活。哈哈~~

4. 依赖倒置原则DIP(the Dependency Inversion Principle DIP)
高层次的模块不应该依赖于低层次的模块，他们都应该依赖于抽象。抽象不应该依赖于具体实现，具体实现应该依赖于抽象。就是你出国要说你是中国人，而不能说你是哪个村子的。比如说中国人是抽象的，下面有具体的xx省，xx市，xx县。你要依赖的是抽象的中国人，而不是你是xx村的。

5. 接口分离原则ISP(the Interface Segregation Principle ISP)
设计时采用多个与特定客户类有关的接口比采用一个通用的接口要好。就比如一个手机拥有打电话，看视频，玩游戏等功能，把这几个功能拆分成不同的接口，比在一个接口里要好的多。
