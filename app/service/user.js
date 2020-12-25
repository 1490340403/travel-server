/*
 * @Author: 陈刚强
 * @Email: 1490340403@qq.com
 * @Date: 2020-12-10 15:03:34
 * @LastAuthor: 陈刚强
 * @LastTime: 2020-12-25 10:18:02
 * @message: 
 */
const Service=require('egg').Service;
const md5 = require('md5');
class UserService extends Service{
  async getUser(username,password=''){
    const {ctx,app}=this
    const _where=password?{username,password:md5(password,'xxx')}:{username}
    const result=await ctx.model.User.findOne({
      where:_where
    })
    return result
  }
  async addUser(params){
    const {ctx}=this
    const result=await ctx.model.User.create({
      ...params,
      password:md5(params.password,'xxx')
    })
    return result
  }
  async edit(params){
    const {ctx}=this
    const result=await ctx.model.User.update({
      ...params,
      updateTime:ctx.helper.time()
    },{
      where:{
        username:params.username
      }
    })
    return result
  }
}
module.exports=UserService;