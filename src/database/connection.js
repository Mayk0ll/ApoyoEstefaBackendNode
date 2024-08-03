const { Sequelize } = require("sequelize");



const sequelize = new Sequelize(
  process.env.NAME_DB,
  process.env.USER_DB,
  process.env.PASSWORD_DB,
  {
    host: process.env.HOST_DB,
    dialect: process.env.DIALECT_DB,
  }
);

const connection = async () => {
  const { User, Role } = require("../models");
  try {
    await sequelize.authenticate();
    // await User.sync({ force: false, alter: true });
    // await Role.sync({ force: false, alter: true });
    // await sequelize.sync({force: true}); 
    console.log("Se sincronizo de manera correcta");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = {connection, sequelize};
