const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection.js');
const { User } = require('./user.model.js');

const Role = sequelize.define('Role',
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    timestamps: false,
  },
);

Role.hasMany(User, {foreignKey: 'roleId', sourceKey: 'id', as: 'users'});
User.belongsTo(Role, {foreignKey: 'roleId', targetKey: 'id', as: 'role'});


module.exports = { Role };