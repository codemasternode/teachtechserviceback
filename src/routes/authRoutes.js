import {
  createUser,
  loginUser,
  checkEmail,
  checkToken,
  confirmEmail,
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
        } else if (err.error == "NOT ENABLE USER") {
          res.status(409).send();
        } else if (err.error === "USER SUSPENDED") {
          res.status(409).send();
        } else if (err.error === "UNCAUGHT ERROR") {
          res.status(500).send();
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

  router.get("/confirm/email/:token", (req, res) => {
    let { token } = req.params;
    if (!token) {
      return res.render("confirmemail", {
        title: "Brak tokenu - poinformuj administratora"
      });
    }
    confirmEmail(token)
      .then(() => {
        res.render("confirmemail", {
          title: "Udało się !!! Potwierdziliśmy twój adres email",
          pathToRedirect: `http://localhost:3001/login`,
          isSuccess: true,
          link: "Zaloguj się"
        });
      })
      .catch(err => {
        res.render("confirmemail", {
          title: "Twoje potwierdzenie wygasło, zarejestruj jeszcze raz konto",
          pathToRedirect: `http://localhost:3001/register`,
          isSuccess: false,
          link: "Zarejestruj się"
        });
      });
  });

  return router;
};
