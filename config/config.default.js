/*
 * @Author: 陈刚强
 * @Email: 1490340403@qq.com
 * @Date: 2020-12-10 14:10:02
 * @LastAuthor: 陈刚强
 * @LastTime: 2020-12-25 13:50:22
 * @message: 
 */
/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1607580528241_3837';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    salt: 'muke',
    redisExpire: 60 * 60 * 24
  };
  //post form请求 关闭csrf安全插件方法
  config.security = {
    // 关闭 csrf
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    //domainWhiteList: [ 'http://localhost:8001/' ], // 配置白名单
  }
  config.cors = {
    // origin: '*', //允许所有跨域访问，注释掉则允许上面 白名单 访问
    credentials: true, // 允许 Cookie 跨域
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };
  config.view = {
    mapping: {'.html': 'ejs'} //左边写成. html后缀，会自动渲染.html文件
 };
 config.mysql = {
  client: {
    // host
    host: 'localhost',
    // 端口号
    port: '3306',
    // 用户名
    user: 'root',
    // 密码
    password: '123456',
    // 数据库名
    database: 'egg_house',
  },
  // 是否加载到 app 上，默认开启
  app: true,
  // 是否加载到 agent 上，默认关闭
  agent: false,
};
 config.auth = {
   //排除这些不要权限
  exclude: [ '/api/user/login', '/api/user/logout','/api/user/detail','/api/user/register']
};
config.sequelize = {
  dialect: 'mysql',
  host: '127.0.0.1',
  port: '3306',
  user:'root',
  database: 'egg_house',
  password: '123456',
  define:{
    timestamps:false,
    freezeTableName:true
  }
};

config.redis = {
  client: {
    port: 6379,          // Redis port
    host: '127.0.0.1',   // Redis host
    password: '123456',
    db: 0
  }
}
config.jwt = {
  secret: '123456',
};
exports.session = {
  key: 'EGG_SESS',  //eggjs默认session的key
  maxAge: 24 * 3600 * 1000,  // 1 day
  httpOnly: true,
  encrypt: true,
  renew: true  //每次访问页面都会给session会话延长时间
}  
  return {
    ...config,
    ...userConfig,
  };
};
