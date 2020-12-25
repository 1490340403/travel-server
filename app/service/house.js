/*
 * @Author: 陈刚强
 * @Email: 1490340403@qq.com
 * @Date: 2020-12-25 14:49:03
 * @LastAuthor: 陈刚强
 * @LastTime: 2020-12-25 16:45:04
 * @message: 
 */
const Service = require('egg').Service
class HouseService extends Service {
  async hot(){
    const {ctx,app}=this
    const result =await ctx.model.House.findAll({
      include:{
        model:app.model.Imgs,
        
      },
      limit:4
    })
    return result
  }
  async search(params){
    const {ctx,app}=this
    const { lte, gte, like } = app.Sequelize.Op;
    const _where={
      cityCode:params.cityCode,
      startTime: {
        [lte]: params.startTime
      },
      endTime: {
        [gte]: params.endTime
      },
      name:{
        [like]:'%'+params.houseName+'%'
      }
    }
    if(!params.houseName){
      delete where.name;
    }
    const result =await ctx.model.House.findAll({
      where:_where,
      include:{
        model:app.model.Imgs
      },
      limit:8,
      offset:(params.pageNum-1)*8
    })
    return result
  }
}
module.exports=HouseService