<!--
 * @Descripttion: 
 * @version: 
 * @Author: suckson
 * @Date: 2019-10-27 20:10:25
 * @LastEditors  : suckson
 * @LastEditTime : 2019-12-29 22:21:24
 -->
### Sequelize的使用

> 

###  Sequelize是什么？？
  
  > Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server. It features solid transaction support, relations, eager and lazy loading, read replication and more.

  > `Sequelize 是一个基于Promise 的nodejs的 ORM,他的特点是稳定的事务支持，关系，快速，懒加载，读取，和复制等！这是官网上Sequelize的总结，其实简单来说。`sequelize就是一个数据库的框架，有了它，我们可以方便的运用他的api进行怎删改查，和定义我们自己业务的数据结构。

  ### sequelize.sync()方法同步表结构

  ```js
import Sequelize from 'sequelize'
import { defineModel } from '../lib/sequelize'
import SequelizeValue from 'sequelize-values';

SequelizeValue(Sequelize);

export default defineModel('user', {
  id: {
    type: Sequelize.BIGINT(11),
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  name: Sequelize.STRING(100),
  user_code: Sequelize.STRING(100),
  password: Sequelize.STRING(100),
  mobile: Sequelize.STRING(50),
  gender: Sequelize.BOOLEAN(0, 1), // 0：男，1：女
  province: Sequelize.STRING(10),
  city: Sequelize.STRING(10),
  erea_name: Sequelize.STRING(50),
  nick_neme: Sequelize.STRING(100),
  user_state: Sequelize.STRING, // 开启，关闭
  user_gorunp: {
    type: Sequelize.ENUM,
    allowNull: true,
    values: ['active', 'pending', 'deleted']
  },
  start_date: Sequelize.DATE(),
  end_date: Sequelize.DATE()
})
```

```js
import User from './usermodel.js'

User.sync()
```
利用sequelize，我们可以用对象的方式定义好表结构。比如说经常使用的user表。这里定义好user的数据结构。执行这个方法，即可实现数据表的批量创建。当然真正的项目环境是很复杂的，不会这样一个一个傻傻的创建，如果我们需要执行一个命令，就可以批量把我们定义的数据结构创建完毕该如何做呢？？

```js
import Sequelize from 'sequelize'
import todolist from '../models/userModel'
import { sequelize } from '../lib/sequelize.js'
import fs from 'fs'
import path from 'path'

var files = fs.readdirSync(path.resolve(__dirname + '/' + '../models'), { encoding: 'utf8' })

console.log(files)

var js_files = files.filter((f) => {
  return f.endsWith('.js')
}, files)

console.log(js_files)

module.exports = {}

for (var f of js_files) {
  console.log(`import model from file ${f}...`)
  var name = f.substring(0, f.length - 3)
  module.exports[name] = require(path.resolve(__dirname + '/../' + 'models') + '/' + f)
}

sequelize.sync() // 同步表结构
```
这里运用到了node的API,我们批量的读取某个目录下的model，并且全部执行，其实就解决了这个问题。

### 添加数据insert
  
  * `findOrCreate`

### 查找数据

  + `findOne`
    - 查找一个对象
  + `findAll`
    - 查找所有数据

[更多详细代码请参考此项目，本文源代码都放在里面](https://github.com/Suckson/restful-server-nodejs)