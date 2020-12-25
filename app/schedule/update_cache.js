/*
 * @Author: 陈刚强
 * @Email: 1490340403@qq.com
 * @Date: 2020-12-14 13:14:20
 * @LastAuthor: 陈刚强
 * @LastTime: 2020-12-14 14:01:55
 * @message: 
 */
const Subscription = require("egg").Subscription;

class WatchFile extends Subscription {
  // 通过schedule属性开设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: "2s",
      type: "all" // 指定所有的worker（进程）都需要执行
    };
  }

  async subscribe() {
    // 定时任务执行的操作
   // console.log(new Date());
  }
}

module.exports = WatchFile;