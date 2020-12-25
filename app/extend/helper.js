/*
 * @Author: 陈刚强
 * @Email: 1490340403@qq.com
 * @Date: 2020-12-24 13:55:35
 * @LastAuthor: 陈刚强
 * @LastTime: 2020-12-24 15:12:38
 * @message: 
 */
const dayjs = require('dayjs');
module.exports={
  time(){
    return dayjs().format('YYYY-MM-DD HH:mm:ss')
  },
  timestamp(data){
    return new Date(data).getTime();
  },
  unPick(data,unique){
    let obj={}
    for(var key in data){
      if(key!==unique){
        obj[key]=data[key]
      }
    }
    return obj
  }
}