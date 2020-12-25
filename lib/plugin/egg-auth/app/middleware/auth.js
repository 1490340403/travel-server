/*
 * @Author: 陈刚强
 * @Email: 1490340403@qq.com
 * @Date: 2020-12-14 09:49:21
 * @LastAuthor: 陈刚强
 * @LastTime: 2020-12-25 13:57:25
 * @message: 
 */
module.exports =options=>{
  return async (ctx,next)=>{
   // const user=ctx.request.token
   const user=ctx.app.redis.get('username')
    if(!user&&!options.exclude.includes(ctx.request.url.split('?')[0])){
      ctx.body={
        status:200,
        errorMsg:'未登录',
        options,
        url:ctx.request.url
      }
    }else{
      await next()
    }
  }
}
