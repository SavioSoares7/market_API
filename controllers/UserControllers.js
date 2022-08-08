const knex = require("../model/database/knex");

const { hash } = require("bcryptjs");

class UserControllers {
  async create(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        status: "Error",
        message: "Preencha todos os campos",
      });
    }

    const checkEmail = await knex("users").select("email").where({ email });

    if (checkEmail.length > 0) {
      return res.status(400).json({
        status: "Error",
        message: "Email já cadastado os campos",
      });
    }

    const hashed = await hash(password, 8);

    await knex("users").insert({
      name,
      email,
      password: hashed,
    });

    res.json();
  }
}

module.exports = UserControllers;
