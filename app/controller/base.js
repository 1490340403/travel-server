/*
 * @Author: 陈刚强
 * @Email: 1490340403@qq.com
 * @Date: 2020-12-24 13:34:32
 * @LastAuthor: 陈刚强
 * @LastTime: 2020-12-24 17:13:38
 * @message: 
 */
const Controller=require('egg').Controller
class BaseController extends Controller{
  success(data={}) {
    const {ctx}=this
    ctx.body={
      status:200,
      data
    }
  }
  error(errorMsg){
    const {ctx}=this
    ctx.body={
      status:500,
      errMsg:errorMsg
    }
  }
}
module.exports=BaseController