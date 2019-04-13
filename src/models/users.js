import bcrypt from "bcryptjs";
import {
  doNotContainSpecialCharacters,
  appropariateLength
} from "./validations";

const user = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          doNotContainSpecialCharacters: value =>
            doNotContainSpecialCharacters(value),
          appropariateLength: value => appropariateLength(value, undefined, 20)
        }
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          doNotContainSpecialCharacters: value =>
            doNotContainSpecialCharacters(value),
          appropariateLength: value => appropariateLength(value, undefined, 40)
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        required: true,
        validate: {
          isEmail: true,
          appropariateLength: value => appropariateLength(value, undefined, 30)
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      isEnable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
      }
    },
    {
      hooks: {
        beforeCreate(user, options) {
          user.hashPassword();
          user.createUsername();
        }
      }
    }
  );

  User.prototype.hashPassword = function hashPassword() {
    let hashed = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
    this.password = hashed;
  };

  User.prototype.createUsername = function createUsername() {
    this.username = (this.first_name + this.last_name)
      .toLowerCase()
      .replace(/ /g, "");
  };

  User.findByLogin = async login => {
    let user = await User.findOne({
      where: { username: login }
    });

    if (!user) {
      user = await User.findOne({
        where: { email: login }
      });
    }

    return user;
  };

  return User;
};

export default user;
