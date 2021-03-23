const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {

  const Diet = sequelize.define('diet', {
    name:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    // description: {
    //   type: DataTypes.TEXT,
    //   allowNull: true,
    // },
  });
};