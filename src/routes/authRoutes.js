import { createUser } from "../services/authService";
import Sequelize from "sequelize";
import color from 'colors'

export default router => {
  router.get("/login", (req, res) => {
    res.send();
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
          console.log(err.error.red)
          res.status(400).send(err.payload);
        } else {
          res.status(500).send();
        }
      });
  });
  return router;
};
