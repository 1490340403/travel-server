/*
 * @Author: 陈刚强
 * @Email: 1490340403@qq.com
 * @Date: 2020-12-25 14:22:12
 * @LastAuthor: 陈刚强
 * @LastTime: 2020-12-25 14:45:37
 * @message: 
 */
const Controller = require('egg').Controller;
const BaseController = require('./base');

class CommonsController extends BaseController {
  async citys() {
    const { ctx, app } = this;
    const data=[[{ label: '杭州', value: '10001' }, { label: '苏州', value: '10002' },{ label: '上海', value: '10003' }]]
     this.success(data)
  }
}

module.exports = CommonsController;