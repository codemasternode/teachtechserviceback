import models from "../config/dbConfig";
import {
  addToRedis,
  checkIsNotExpire,
  removeFromRedis,
  getFromRedis
} from "../config/redisConfig";
import Sequelize from "sequelize";
import { sign } from "jsonwebtoken";
import uniqueId from "uniqid";
import { sendConfirmationEmail } from "./mailer";

export function createUser(newUser) {
  return new Promise((resolve, reject) => {
    models.Users.create(newUser)
      .then(user => {
        let confirmation = uniqueId("confirmation-");
        addToRedis(confirmation, newUser.email, 86400);
        sendConfirmationEmail({
          email: newUser.email,
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          url: `${process.env.DOMAIN}/auth/confirm/email/${confirmation}`
        });
        resolve(user);
      })
      .catch(Sequelize.UniqueConstraintError, err => {
        reject({
          error: "Unique Field Error",
          payload: {
            msg:
              "This account is occupied, this client doesn not service checking unique"
          }
        });
      })
      .catch(Sequelize.ValidationError, err => {
        let payload = [];
        for (let i = 0; i < err.errors.length; i++) {
          let currentError = err.errors[i];
          payload.push({
            path: currentError.path,
            origin: currentError.value,
            problem: currentError.validatorKey
          });
        }
        reject({ error: "Validation Error", payload });
      })
      .catch(err => {
        reject({ error: "Unhandled Error" });
      });
  });
}

export function loginUser(candidateOnUser) {
  return new Promise((resolve, reject) => {
    let { email, password } = candidateOnUser;
    let authenticateUser = models.Users.authenticateUser({ email, password });
    let prepareJWT = new Promise((resolve, reject) => {
      sign({ email }, process.env.JWT_PRIVATE_KEY, (err, token) => {
        if (err) {
          reject({
            error: "JWT PROBLEM CREATION"
          });
        }
        resolve(token);
      });
    });

    Promise.all([authenticateUser, prepareJWT])
      .then(odps => {
        console.log(odps[0].dataValues);
        let user = odps[0].dataValues;
        let unique = uniqueId("token-");
        addToRedis(unique, odps[1], 86400);
        checkIsNotExpire(unique, (err, time) => {
          resolve({
            token: unique,
            time,
            isAdmin: user.isAdmin
          });
        });
      })
      .catch(errors => {
        reject(errors);
      });
  });
}

export function checkEmail(email) {
  return new Promise((resolve, reject) => {
    models.Users.findAll({
      where: {
        email
      }
    })
      .then(users => {
        if (users.length > 0) {
          resolve(true);
        }
        resolve(false);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function checkToken(token) {
  return new Promise((resolve, reject) => {
    checkIsNotExpire(token, (err, time) => {
      if (err) {
        reject(err);
      }
      resolve(time);
    });
  });
}

export function logout(token) {
  return new Promise((resolve, reject) => {
    removeFromRedis(token, (err, reply) => {
      console.log("asd");
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export function confirmEmail(token) {
  return new Promise((resolve, reject) => {
    getFromRedis(token, (err, reply) => {
      if (err) {
        reject();
      }
      console.log(token, reply);
      if (!reply) {
        reject();
      } else {
        models.Users.changeEnable({email: reply})
          .then(() => {
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      }
    });
  });
}
