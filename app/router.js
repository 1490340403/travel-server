/*
 * @Author: 陈刚强
 * @Email: 1490340403@qq.com
 * @Date: 2020-12-10 14:10:02
 * @LastAuthor: 陈刚强
 * @LastTime: 2020-12-25 16:02:29
 * @message: 
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/api/user/register', controller.user.register);
  router.post('/api/user/login', controller.user.login);
  router.post('/api/user/detail', controller.user.detail);
  router.post('/api/user/edit',controller.user.edit);
  router.post('/api/user/layout',controller.user.layout)
  router.post('/api/commons/citys',controller.commons.citys)
  router.post('/api/house/hot',controller.house.hot)
  router.post('/api/house/search',controller.house.search)
};
