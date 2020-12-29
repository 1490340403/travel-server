/*
 * @Author: 陈刚强
 * @Email: 1490340403@qq.com
 * @Date: 2020-12-29 09:23:27
 * @LastAuthor: 陈刚强
 * @LastTime: 2020-12-29 15:13:47
 * @message: 
 */
const Service = require('egg').Service
class Comment extends Service {
  async add(params){
    const {ctx}=this
    const result=await ctx.model.Comment.create(params)
    return result
  }
  async list(params){
    const {ctx,app}=this
    const result=await ctx.model.Comment.findAll({
      limit: params.pageSize,
      offset:(params.pageNum-1)*params.pageSize,
      where:{
        userId: params.userId,
        houseId: params.houseId
      }, 
      include:[
        {
          model: app.model.User,
          attributes: ['avatar', 'username']
        }
      ]
    })
    return result
  }

}
module.exports = Comment