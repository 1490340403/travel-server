/*
 * @Author: 陈刚强
 * @Email: 1490340403@qq.com
 * @Date: 2020-12-14 11:07:23
 * @LastAuthor: 陈刚强
 * @LastTime: 2020-12-14 11:11:07
 * @message: 
 * 
 */
module.exports={
  params(key){
    const method=this.request.method
    if(method=='GET'){
      return key ? this.query[key] : this.query;
    }else {
      return key ? this.request.body[key] :this.request.body
    }
  }
}