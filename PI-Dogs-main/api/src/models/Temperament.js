// const { DataTypes } = require('sequelize');
// // Exportamos una funcion que define el modelo
// // Luego le injectamos la conexion a sequelize.
// module.exports = (sequelize) => {
//   // defino el modelo
//   sequelize.define('temperament', {
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   });
// };

const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "temperament",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "temperament",
      name: {
        singular: "temperament",
        plural: "temperament",
      },
    }
  );
}

// ?api_key=e1b33902-0296-486c-b254-18ab6359b5db