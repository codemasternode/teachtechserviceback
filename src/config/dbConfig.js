import { Sequelize } from "sequelize";
import path from "path";

let sequelize = new Sequelize(
  process.env.POSTGRES_DATABASE,
  process.env.POSTGRES_USERNAME,
  process.env.POSTGRES_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
    //pool umożliwia nam konfigurację połączenia
    pool: {
      //minimalna liczba połączeń jaka jest możliwa
      min: 1,
      //maksymalna liczba połączeń jaka jest możliwa
      max: 5,
      //przez ile milisekund połączenia ma być bezczynne zanim zostanie użyte
      idle: 5000
    }
  }
);

const models = {
  Users: sequelize.import(path.join(__dirname, "../models/users.js"))
};

Object.keys(models).forEach(function(key) {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
