/*
 * @Author: 陈刚强
 * @Email: 1490340403@qq.com
 * @Date: 2020-12-14 10:49:11
 * @LastAuthor: 陈刚强
 * @LastTime: 2020-12-14 10:55:15
 * @message: 
 */
const { getPackedSettings } = require('http2');
const path = require('path');
module.exports ={
  //方法扩展
  package(key){
    const pack=getPack()
    return key?pack[key]:pack
  },
  get allPackage(){
    return getPack();
  }
}
function getPack(){
  const filePath= path.join(process.cwd(),"package.json");
  const pack=require(filePath)
  return pack;
}

