import models from "../config/dbConfig";
import { addToRedis, checkIsNotExpire } from "../config/redisConfig";
import Sequelize from "sequelize";
import { sign } from "jsonwebtoken";
import uniqueId from "uniqid";

export function createUser(newUser) {
  return new Promise((resolve, reject) => {
    models.Users.create(newUser)
      .then(user => {
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
        let unique = uniqueId("token-");
        addToRedis(unique, odps[1]);
        resolve({ token: unique });
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
