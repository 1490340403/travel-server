/*
 * @Author: 陈刚强
 * @Email: 1490340403@qq.com
 * @Date: 2020-12-25 15:33:22
 * @LastAuthor: 陈刚强
 * @LastTime: 2020-12-29 15:37:51
 * @message: 
 */
module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Orders = app.model.define('orders', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    order_number: STRING(20),
    userId: INTEGER,
    houseId: INTEGER,
    isPayed: {
      type: INTEGER,
      defaultValue: 0
    },
    createTime: {
      type: DATE,
      get(){
        return new Date(this.getDataValue('createTime')).getTime()
      }
    },
    updateTime: {
      type: DATE,
      get(){
        return new Date(this.getDataValue('updateTime')).getTime()
      }
    }
  });

  Orders.associate = () => {
    app.model.Orders.belongsTo(app.model.House, { foreignKey: 'houseId', as: 'house' });
  }

  return Orders;
}