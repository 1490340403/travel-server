/*
 * @Author: 陈刚强
 * @Email: 1490340403@qq.com
 * @Date: 2020-12-29 09:20:03
 * @LastAuthor: 陈刚强
 * @LastTime: 2020-12-29 15:25:51
 * @message: 
 */
const BaseController=require('./base')
class CommentsController extends BaseController {
  async add(){
    const {ctx}=this
    const params=ctx.params()
    const result =await ctx.service.comments.add(params);
    if(result){
      this.success(result)
    }else{
      this.error('添加失败')
    }
  }
  async list(){
    const {ctx}=this
    const params=ctx.params()
    const result=await ctx.service.comments.list(params)
    this.success(result)
  }

}
module.exports=CommentsController