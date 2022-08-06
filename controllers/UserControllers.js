const AppError = require("../model/util/AppError");

class UserControllers {
  create(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new AppError("Por favor preencha todos os campos");
    }
    res.json({ name, email, password });
  }
}

module.exports = UserControllers;
