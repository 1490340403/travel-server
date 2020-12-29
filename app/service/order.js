/*
 * @Author: 陈刚强
 * @Email: 1490340403@qq.com
 * @Date: 2020-12-29 15:17:21
 * @LastAuthor: 陈刚强
 * @LastTime: 2020-12-29 17:02:37
 * @message: 
 */
const Service = require('egg').Service
class OrderService extends Service {
  async isOrder(params){
    const {ctx}=this
    const result=await ctx.model.Orders.findOne({
      where:{
        userId: params.userId,
        houseId: params.houseId
      }
    })
    if(!result){
      await ctx.model.Orders.create({
        userId: params.userId,
        houseId: params.houseId,
        isPayed:1,
      })
    }
    return result
  }
  async updateOrder(params){
    const {ctx}=this
    const result = await ctx.model.Orders.update({isPayed:params.isPayed},{
      where:{
        userId:params.userId,
        houseId:params.houseId
      }
    })
    return result
  }
}
module.exports = OrderService
