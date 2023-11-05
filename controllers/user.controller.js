const { users } = require("../models");
const utils = require("../utils");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();
const secret_key = process.env.JWT_KEY || "no_secret";

module.exports = {
  register: async (req, res) => {
    try {
      const data = await users.create({
        data: {
          email: req.body.email,
          password: await utils.cryptPassword(req.body.password),
          isActive: true,
        },
      });

      return res.status(201).json({
        data: utils.exclude(data, ["password"]), // Agar password tidak muncul saat Register
      });
    } catch (error) {
      return next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const findUser = await users.findFirst({
        where: {
          email: req.body.email,
        },
      });

      if (!findUser) {
        return res.status(404).json({
          error: "Your email is not registered in our system",
        });
      }

      if (bcrypt.compareSync(req.body.password, findUser.password)) {
        const token = jwt.sign({ id: findUser.id }, secret_key, {
          expiresIn: "6h",
        });

        return res.status(200).json({
          data: {
            token,
          },
        });
      }

      return res.status(403).json({
        error: "Invalid credentials",
      });
    } catch (error) {
      return next(error);
    }
  },
};
