/*
 * @Author: 陈刚强
 * @Email: 1490340403@qq.com
 * @Date: 2020-12-10 14:18:06
 * @LastAuthor: 陈刚强
 * @LastTime: 2020-12-25 13:56:36
 * @message: 
 * 
 */
const Controller=require('egg').Controller
const BaseController=require('./base')
class UserController extends BaseController{
  async register(){
    const {ctx,app}=this
    const params=ctx.params()
    const user=await ctx.service.user.getUser(params.username)
    if(user){
      this.error('用户已经存在')
      return
    }
   const result=await ctx.service.user.addUser(params)
   if(result){
     const res=ctx.helper.unPick(result.dataValues,'password')
     const token = app.jwt.sign({
      id:res.id,
      username: res.username
    }, app.config.jwt.secret);
    //ctx.session.token=token
    app.redis.set('username', token, 'EX', app.config.redisExpire)
    this.success({
      ...res,
      createTime:ctx.helper.time(),
      token
    })
   }else{
    this.error('注册失败，请重试')
   }
  }
 async login(){
   const {ctx,app}=this
   const params=ctx.params()
   const user=await ctx.service.user.getUser(params.username,params.password)
   if(!user){
    this.error('用户不存在')
   }else{
    const token = app.jwt.sign({
      id:user.id,
      username: user.username
    }, app.config.jwt.secret);
    //ctx.session.token=token
    app.redis.set('username', token, 'EX', app.config.redisExpire)
    const res=ctx.helper.unPick(user.dataValues,'password')
     this.success({
       ...res,
       token
     })
   }
 }
 async detail(){
  const {ctx}=this
  const params=ctx.params()
  const user=await ctx.service.user.getUser(params.username)
  const res=ctx.helper.unPick(user.dataValues,'password')
  if(!user){
    this.error('用户不存在')
  }else{
    this.success(res)
  }
 }
 async edit(){
   const {ctx}=this
   let params={...ctx.params()}
   const result=await ctx.service.user.edit(params)
   if(result){
     this.success(result)
   }else{
     this.error('更新失败')
   }
 }
 async layout(){
   const {ctx}=this
   //ctx.session.token=null
   app.redis.del('username')
   this.success('ok')
 }
}

module.exports=UserController