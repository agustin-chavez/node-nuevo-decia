var express = require("express");
var router = express.Router();

let users = [];

/* GET users listing. */
router.get("/", function (req, res, next) {
  return res.status(200).json(users);
});

// Ruta para crear un nuevo usuario
router.post("/new", (req, res) => {
  const { username } = req.body;

  // Verificar si se proporcionó un nombre de usuario
  if (!username) {
    return res.status(400).json({ error: "Se requiere un nombre de usuario" });
  }

  // Crear un nuevo usuario
  const newUser = {
    id: users.length + 1,
    username: username,
  };

  // Agregar el usuario a la lista de usuarios
  users.push(newUser);

  return res.status(201).json(newUser);
});

module.exports = router;
