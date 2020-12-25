/*
 * @Author: 陈刚强
 * @Email: 1490340403@qq.com
 * @Date: 2020-12-15 09:52:47
 * @LastAuthor: 陈刚强
 * @LastTime: 2020-12-24 09:43:40
 * @message: 
 */
module.exports = app => {
  const { STRING, INTEGER, TEXT, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username: STRING(20),
    password: STRING(64),
    avatar: TEXT('long'),
    phone: STRING(20),
    sign: STRING(300),
    createTime: DATE,
    updateTime: DATE
  });

  return User;
}