/*
 * @Author: 陈刚强
 * @Email: 1490340403@qq.com
 * @Date: 2020-12-29 15:16:00
 * @LastAuthor: 陈刚强
 * @LastTime: 2020-12-29 17:14:34
 * @message: 
 */
const BaseController=require('./base')
class OrderController extends BaseController {
  async isOrder(){
    const {ctx}=this
    const params=ctx.params()
    const result=await ctx.service.order.isOrder(params)
    if(!result){
     this.success({
      userId:params.userId,
      houseseId:params.houseseId,
      isPayed:0
     })
    }else{
      this.success(result)
    }
   }
  async updateOrder(){
    const {ctx}=this
    const params=ctx.params()
    const result= await ctx.service.order.updateOrder(params)
    this.success(result)
  }
}
module.exports=OrderController