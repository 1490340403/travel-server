<!--
 * @Author: 陈刚强
 * @Email: 1490340403@qq.com
 * @Date: 2020-12-10 14:10:02
 * @LastAuthor: 陈刚强
 * @LastTime: 2020-12-28 11:02:48
 * @message: 
-->
"# travel-server" 
"## egg创建"
  npm i egg-init -g
  egg-init egg-example --type=simple   //例如:egg-init 项目名称 --type=simple
  cd egg-example
  npm i
"## 路由"
  egg在设计完全符合比较好的mvc的设计模式。
  全名是Model View Controller，是模型(model)－视图(view)－控制器(controller)的缩写，一种软件设计典范。
  "### 控制器"

// app/controller/home.js
  const Controller = require('egg').Controller;
  class HomeController extends Controller {
    async index() {
      const { ctx } = this;
      ctx.body = 'hi, world';
    }
  }

module.exports = HomeController;

"### 路由"
router.get('/index', controller.home.index);
访问 http://127.0.0.1:7001/index 输出  hi, world


"### 数据模型 Model"
简单来说，Service 就是在复杂业务场景下用于做业务逻辑封装的一个抽象层，提供这个抽象有以下几个好处：
保持 Controller 中的逻辑更加简洁。
保持业务逻辑的独立性，抽象出来的 Service 可以被多个 Controller 重复调用。
将逻辑和展现分离，更容易编写测试用例。
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

"### get post 参数"
"#### get请求"
在 URL 中 ?后面的部分是一个 Query String，这一部分经常用于 GET 类型的请求中传递参数。例如 GET /search?name=egg&age=26中 name=egg&age=26 就是用户传递过来的参数。我们可以通过 context.query(为一个对象)拿到解析过后的这个参数体
"#### post请求"
ctx.request.body
为了解决post get请求参数问题：
在app目录下新建middleware文件夹
在app目录下新建middleware文件夹在app目录下新建middleware文件夹
/**
 * 获取请求参数中间件
 * 可以使用ctx.params获取get或post请求参数
 */
module.exports = options => {
  return async function params(ctx, next) {
    ctx.params = {
      ...ctx.query,
      ...ctx.request.body
    }
    await next();
  };
};

在/config/config.default.js里注入中间件

'use strict';
module.exports = appInfo => {
  const config = exports = {};
// 注入中间件
  config.middleware = [
    'params',
  ];
  return config;
};

使用时直接解构出想要的数据
const { userId,title,content} = ctx.params;

"### 跨域"
// config/plugin.js
exports.cors = {
  enable: true,
  package: 'egg-cors',
};

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

"### 自定义插件实现权限限制问题"
/app/lib/plugin/egg-auth/app文件夹下
package.json
{
  "name": "egg-auth",
  "eggPlugin": {
    "name": "auth"
  }
}
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

项目列表下创建 app.js
module.exports=app=>{
  app.config.coreMiddleware.push('auth')
}