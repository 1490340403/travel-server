<!--
 * @Author: 陈刚强
 * @Email: 1490340403@qq.com
 * @Date: 2020-12-10 14:10:02
 * @LastAuthor: 陈刚强
 * @LastTime: 2020-12-28 17:34:21
 * @message: 
-->
# travel-server
## egg创建
  npm i egg-init -g
  egg-init egg-example --type=simple   //例如:egg-init 项目名称 --type=simple
  cd egg-example
  npm i
## 路由
  egg在设计完全符合比较好的mvc的设计模式。
  全名是Model View Controller，是模型(model)－视图(view)－控制器(controller)的缩写，一种软件设计典范。
### 控制器
```
// app/controller/home.js
  const Controller = require('egg').Controller;
  class HomeController extends Controller {
    async index() {
      const { ctx } = this;
      ctx.body = 'hi, world';
    }
  }

module.exports = HomeController;
```
### 路由
router.get('/index', controller.home.index);
访问 http://127.0.0.1:7001/index 输出  hi, world


### 数据模型 Model
简单来说，Service 就是在复杂业务场景下用于做业务逻辑封装的一个抽象层，提供这个抽象有以下几个好处：
* 保持 Controller 中的逻辑更加简洁。
* 保持业务逻辑的独立性，抽象出来的 Service 可以被多个 Controller 重复调用。
* 将逻辑和展现分离，更容易编写测试用例。
```
// app/service/user.js
const Service = require('egg').Service;
class UserService extends Service {
  async addName(name) {
    const user = `你好,${name}`;
    return user;
  }
}
module.exports = UserService;

// app/controller/user.js
class UserController extends Controller {
  async info() {
    const { ctx } = this;
    const userInfo = await ctx.service.user.addName('wjw');
    ctx.body = userInfo;
  }
}
```
### get post 参数
#### get请求
在 URL 中 ?后面的部分是一个 Query String，这一部分经常用于 GET 类型的请求中传递参数。例如 GET /search?name=egg&age=26中 name=egg&age=26 就是用户传递过来的参数。我们可以通过 context.query(为一个对象)拿到解析过后的这个参数体
#### post请求
ctx.request.body
为了解决post get请求参数问题：
在app目录下新建middleware文件夹
在app目录下新建middleware文件夹在app目录下新建middleware文件夹
/**
 * 获取请求参数中间件
 * 可以使用ctx.params获取get或post请求参数
 */
```
module.exports = options => {
  return async function params(ctx, next) {
    ctx.params = {
      ...ctx.query,
      ...ctx.request.body
    }
    await next();
  };
};
```
在/config/config.default.js里注入中间件
```
'use strict';
module.exports = appInfo => {
  const config = exports = {};
// 注入中间件
  config.middleware = [
    'params',
  ];
  return config;
};
```
使用时直接解构出想要的数据
const { userId,title,content} = ctx.params;

### 跨域
```
// config/plugin.js
exports.cors = {
  enable: true,
  package: 'egg-cors',
};
```
```
 // config/config.default.js
config.security = {
  csrf: {
    enable: false,
    ignoreJSON: true,
  },
  domainWhiteList: [ 'http://www.baidu.com' ], // 配置白名单
};

config.cors = {
  // origin: '*',//允许所有跨域访问，注释掉则允许上面 白名单 访问
  allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
};
```
### 自定义插件实现权限限制问题
/app/lib/plugin/egg-auth/app文件夹下
```
package.json
{
  "name": "egg-auth",
  "eggPlugin": {
    "name": "auth"
  }
}
```
```
middleware/auth.js

module.exports =options=>{
  return async (ctx,next)=>{
   // const user=ctx.request.token
   const user=await ctx.app.redis.get('username')
    if(!user&&!options.exclude.includes(ctx.request.url.split('?')[0])){
      ctx.body={
        status:200,
        errorMsg:'未登录',
        options,
        url:ctx.request.url
      }
    }else{
      await next() 
    } 
  }
}
```
```
app/config/config.default.js
 config.auth = {
   //排除这些不要权限
  exclude: [ '/api/user/login', '/api/user/logout','/api/user/register']
};
app/config/plugin.js
exports.auth={
  enable: true,
  path:path.join(__dirname, '../lib/plugin/egg-auth')
}
```
项目列表下创建 app.js
module.exports=app=>{
  app.config.coreMiddleware.push('auth')
}
## 连接数据库mysql
* 安装mysql
```
npm i --save egg-mysql
```
### 配置数据库
* config/plugins
```
exports.mysql = {
  enable: true,
  package: 'egg-mysql'
};
```
* config/config.default.js

```
  config.mysql = {
    app: true,
    agent: false,
    client: {
      host: '127.0.0.1',
      port: '3306',
      user: 'root',
      password: 'abc123456',
      database: 'egg'  
    }
  };
```
### 增删改查
#### 增加
```
service文件
user.js
async add(){
  const result = await this.app.mysql.insert('users', {
      name: 'wjw',
      age: 18
    })
  return result
}
controller

ctx.service.user.add()
// 判断：result.affectedRows === 1

```
#### 查询
```
const result = await this.app.mysql.select('users', {
  columns: ['id', 'name'], //查询字段，全部查询则不写，相当于查询*
  where: {
      name: 'wjw'
  }, //查询条件
  orders: [
      ['id', 'desc'] //降序desc，升序asc
  ],
  limit: 10, //查询条数
  offset: 0 //数据偏移量（分页查询使用）
})
//判断：result.length > 0
```

#### 修改
```
const result = await this.app.mysql.update('users', {
      age: 20 //需要修改的数据
  }, {
      where: {
        id: 1
      } //修改查询条件
  });
//判断：result.affectedRows === 1
```
#### 删除
```
const result = await this.app.mysql.delete('users', {
    name: 'wjw'
})

```
## 使用Sequelize连接数据库
### 下载
```
cnpm i egg-sequelize mysql2 -S
```
### 配置
#### app/config文件下
* config.default.js
```
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'abc123456',
    database: 'egg_house',
    define: {
      timestamps: false,
      freezeTableName: true
    }
  };

```
* plugin.js
```
exports.sequelize = {
  enable: true,
  package: 'egg-sequelize'
};
```
### 定义模型对象
数据库中表的名称、使用到的字段、字段类型等
* app/model/user.js
```
module.exports = app => {
  const { STRING, INTEGER, TEXT, DATE } = app.Sequelize;
  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username: STRING(20),
    password: STRING(64),
    avatar: TEXT('long'),
    phone: STRING(20),
    sign: STRING(300),
    createTime: DATE,
    updateTime: DATE
  });

  return User;
}
```
### 增删改查

#### 增加
```
let model= {
	name:"test",
	password:"adwadfv2324"
}
 await ctx.model.User.create(model)
//insert into model (name,password) values("test","adwadfv2324");
```
#### 删除
```
await ctx.model.User.destroy({
  where: { id }
});
```
#### 改
```
await ctx.model.User.update(params,{
 where:{ id:ctx.user.id}
})
```
#### 查找
```
//根据id查
let model = await ctx.model.User.findById(12);
//select a,b,c from model where id=12;
//查询一条记录 
let model = await ctx.model.User.findOne({
	where:{id:12}
});
//select a,b,c from model where id=12;
//分页查询
await ctx.model.Orders.findAll({
  where: {
    userId: params.userId
  },
  limit: params.pageSize,
  offset: (params.pageNum -1) * params.pageSize,
});
```
#### 多表联查
```
一对一的方法有：hasOne(Model, {foreignKey:对方,})和belongsTo(Model,{foreignKey:自己,targetKey:对方})
一对多的方法有： hasMany(Model,{foreignKey:对方, targetKey:自己})和belongsTo(Model,{foreignKey:自己,targetKey:对方})
多对多的方法有： belongsToMany(Model,{through:Model, targetKey:自己, otherKey:对方})
```
* 一对一
```
student表和info表是存在一对一关系的，一个学生有一条专属信息。
 hasOne()和belongsTo()第一个参数为本表关联的另外一个表的Model实例，第二个参数中，都有foreginKey属性
//对hasOne来说，这个属性值是对方表与自己Id对应的字段
 app.model.Student.hasOne(app.model.Info, {foreignKey: 'studentId'});
 //对belongsTo来说，这个属性值是本表上的与对方表id对应的字段名。belongsTo比hasOne多了个targetKey属性，其为对方表的对应主键名
 app.model.Info.belongsTo(app.model.Student, {foreignKey: 'studentId', targetKey: 'id'})

 // 获取学生信息 通过一对多的联系
async info(){
  const { ctx, app } = this;
  let result = await app.model.Student.findAll({
    include: {
      model: app.model.Info
    }
  });
  ctx.body = result;
}
```
* 一对多
```
classes与student是一对多的关系，一个班级有多个学生，多个学生组成一个班级。
has开头的方法中，foreginKey属性值从对方的表上找，如果有targetKey的值则是自己的主键；
belongs开头的方法中，foreginKey属性值在自身表上找，targetKey属性值则是对方表上
app.model.Student.belongsTo(app.model.Classes, {foreignKey: 'classId', targetKey: 'id'});
app.model.Classes.hasMany(app.model.Student, {foreignKey: 'classId', targetKey: 'id'});
```
* 多对多
```
student与lession存在多对多关系，中间表为lession_student
// 与Lessison存在多对多关系，使用belongsToMany()
  app.model.Student.belongsToMany(app.model.Lession, {
      through: app.model.LessionStudent,
      foreignKey: 'studentId',
      otherKey: 'lessionId'
  });
// 与student表是多对多关系
app.model.Lession.belongsToMany(app.model.Student, {
    through: app.model.LessionStudent,
    foreignKey: 'lessionId',
    otherKey: 'studentId'
});
```
## Cookie 的使用
```
cookie 是存储于访问者的计算机中的变量。可以让我们用同一个浏览器访问同一个域名的时候共享数据。
HTTP 是无状态协议。简单地说，当你浏览了一个页面，然后转到同一个网站的另一个页面，服务器无法认识到这是同一个浏览器在访问同一个网站。每一次的访问，都是没有任何关系的。
```
* 用法 
```
this.ctx.cookies.set('name','zhangsan');
this.ctx.cookies.get('name')
this.ctx.cookies.set('name',null);
设置中文
ctx.cookies.set(key, value, {
	maxAge:24 * 3600 * 1000,
	httpOnly: true, // 默认情况下是正确的
	encrypt: true, // cookie在网络传输期间进行加密
});
```
## Session的使用
```
session 是另一种记录客户状态的机制，不同的是 Cookie 保存在客户端浏览器中，而session 保存在服务器上。
```
* 用法
```
this.ctx.session.userinfo={
	name:'张三', 
  age:'20'
}
var userinfo=this.ctx.session
文件config/config.default.js
config.session = {
  key: 'EGG_SESS',
  maxAge: 24 * 3600 * 1000, // 1 day httpOnly: true,
  encrypt: true
};

```
### cookie 和session 区别
* cookie 数据存放在客户的浏览器上，session 数据放在服务器上
* cookie 相比 session 没有 session 安全，别人可以分析存放在本地的 COOKIE 并进行 COOKIE欺骗。
* session 会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能考虑到减轻服务器性能方面，应当使用 COOKIE
* 单个 cookie 保存的数据不能超过 4K，很多浏览器都限制一个站点最多保存 20 个 cookie。
## jwt使用
```
npm i egg-jwt -S
配置  在config/plugin.js文件里
config.jwt = {
  secret: '123456',
};
并在config/config.default.js里面　
exports.jwt = {
  enable: true,
  package: 'egg-jwt',
}
token = app.jwt.sign({
    username
  }, app.config.jwt.secret,{expiresIn:'1h'});
----------------------------------------------------------------
判断token，自定义中间件
app/middleware/userExist.js
module.exports = options => {
  return async (ctx, next) => {
    const token = this.request.header.token;
    const tokenCache= this.app.jwt.verify(token, this.app.config.jwt.secret)
    const user = await ctx.service.user.getUser(tokenCache);
    //这里用解析出来的token值去请求该用户是否在数据库
    if(!user){
      ctx.body = {
        status: 500,
        errMsg: '用户不存在'
      };
      return;
    }else {
      await next();
    }
  }
}
在router.js使用
module.exports = app => {
  const { router, controller } = app;
  const userExist = app.middleware.userExist();
  router.post('/api/user/detail', userExist, controller.user.detail);
};

```