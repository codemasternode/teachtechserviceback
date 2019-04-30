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
          appropariateLength: value => appropariateLength(value, undefined, 30)
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

  User.prototype.checkPassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  };

  User.prototype.hashPassword = function hashPassword() {
    let hashed = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
    this.password = hashed;
  };

  User.prototype.createUsername = function createUsername() {
    this.username = (this.first_name + this.last_name)
      .toLowerCase()
      .replace(/ /g, "");
  };

  User.authenticateUser = async ({ email, password }) => {
    let user = await User.findOne({
      where: {
        email
      }
    });
    if (!user) {
      throw {
        error: "NOT EXISTING USER",
        payload: {
          email
        }
      };
    }

    if (await user.checkPassword(password)) {
      return user;
    } else {
      throw {
        error: "NOT VALID PASSWORD",
        payload: null
      };
    }
  };

  User.findByEmail = async email => {
    let user = await User.findOne({
      where: { email }
    });

    return user;
  };

  return User;
};

export default user;
