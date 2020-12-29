/*
 * @Author: 陈刚强
 * @Email: 1490340403@qq.com
 * @Date: 2020-12-25 14:47:12
 * @LastAuthor: 陈刚强
 * @LastTime: 2020-12-29 15:07:48
 * @message: 
 */
const BaseController=require('./base')
class HouseController extends BaseController {
  async hot(){
    const {ctx}=this
    const result=await ctx.service.house.hot();
    if(result){
      this.success(result)
    }else{
      this.error('未找到')
    }
  }
  async search(){
    const {ctx}=this
    const params=ctx.params()
    const result=await ctx.service.house.search(params)
    if(result){
      this.success(result)
    }else{
      this.error('没有数据')
    }
  }

}
module.exports=HouseController