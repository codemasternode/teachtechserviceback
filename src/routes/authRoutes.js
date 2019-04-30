import {
  createUser,
  loginUser,
  checkEmail,
  checkToken,
  logout
} from "../services/authService";
import Sequelize from "sequelize";
import color from "colors";

export default router => {
  router.post("/login", (req, res) => {
    if (!req.body.user.email || !req.body.user.password) {
      return res.status(400).send();
    }
    loginUser(req.body.user)
      .then(token => {
        res.send(token);
      })
      .catch(err => {
        if (err.error === "NOT VALID PASSWORD") {
          res.status(401).send();
        } else if (err.error === "NOT EXISTING USER") {
          res.status(401).send(err);
        } else if (err.error === "UNCAUGHT ERROR") {
        } else {
          res.status(500).send();
        }
      });
  });

  router.post("/logout", (req, res) => {
    if (!req.body.token) {
      return res.status(400).send();
    }

    logout(req.body.token)
      .then(() => {
        res.send();
      })
      .catch(err => {
        res.status(404).send(err);
      });
  });

  router.post("/register", (req, res) => {
    createUser(req.body.user)
      .then(user => {
        res.status(201).send(user);
      })
      .catch(err => {
        if (
          err.error == "Validation Error" ||
          err.error == "Unique Field Error"
        ) {
          console.log(err.error.red);
          res.status(400).send(err.payload);
        } else {
          res.status(500).send();
        }
      });
  });
  router.post("/checkemail", (req, res) => {
    let { email } = req.body;
    checkEmail(email)
      .then(isOccupied => {
        res.send({ isOccupied });
      })
      .catch(err => {
        res.status(500).send();
      });
  });

  router.post("/checkauth", (req, res) => {
    if (!req.body.token) {
      return res.status(400);
    }
    checkToken(req.body.token)
      .then(time => {
        res.send({ time });
      })
      .catch(err => {
        console.log(err);
        if (err.error == "NOT EXIST") {
          res.status(404).send();
        } else if (err.error == "NOT EXPIPRE") {
          res.status(500).send();
        } else {
          res.status(500).send();
        }
      });
  });

  return router;
};
