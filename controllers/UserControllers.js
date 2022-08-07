const AppError = require("../model/util/AppError");

const knex = require("../model/database/knex");
class UserControllers {
  async create(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new AppError("Por favor preencha todos os campos");
    }

    const checkEmail = await knex("users").select("email").where({ email });

    if (checkEmail.length > 0) {
      throw new AppError("Email já em uso");
    }

    await knex("users").insert({
      name,
      email,
      password,
    });

    res.json();
  }
}

module.exports = UserControllers;
