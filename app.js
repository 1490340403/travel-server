/*
 * @Author: 陈刚强
 * @Email: 1490340403@qq.com
 * @Date: 2020-12-14 09:52:29
 * @LastAuthor: 陈刚强
 * @LastTime: 2020-12-24 16:00:25
 * @message: 
 */
module.exports=app=>{
  app.config.coreMiddleware.push('auth')
}
