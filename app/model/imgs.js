/*
 * @Author: 陈刚强
 * @Email: 1490340403@qq.com
 * @Date: 2020-12-25 14:57:58
 * @LastAuthor: 陈刚强
 * @LastTime: 2020-12-25 15:28:10
 * @message: 
 */
module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Imgs = app.model.define('imgs', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    url: STRING(500),
    houseId: INTEGER,
    createTime: DATE
  });
  Imgs.associate = () => {
    app.model.Imgs.belongsTo(app.model.House, { foreignKey: 'houseId' });
  }
  return Imgs;
}