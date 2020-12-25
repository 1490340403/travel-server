/*
 * @Author: 陈刚强
 * @Email: 1490340403@qq.com
 * @Date: 2020-12-10 14:10:02
 * @LastAuthor: 陈刚强
 * @LastTime: 2020-12-25 13:23:54
 * @message: 
 */
'use strict';
const path=require('path');
/** @type Egg.EggPlugin */
//解决跨域
exports.cors = {
  enable: true,
  package: 'egg-cors',
};

exports.ejs = {
  enable: true,
  package: 'egg-view-ejs',
};

exports.auth={
  enable: true,
  path:path.join(__dirname, '../lib/plugin/egg-auth')
}
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};
exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};
exports.jwt = {
  enable: true,
  package: 'egg-jwt',
}
exports.redis = {
  enable: true,
  package: 'egg-redis',
};
