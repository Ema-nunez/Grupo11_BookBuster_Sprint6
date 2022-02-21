const { localsName } = require("ejs");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const modelController = require("../model/jsonDatabase");
const jsonDB = require("../model/jsonDatabase");
const usersModel = jsonDB("users");

const userController = {
  login: (req, res) => {
    return res.render("users/login");
  },

  loginproceso: (req, res) => {
    let userToLogin = usersModel.findByField("email", req.body.email);

    if (userToLogin) {
      let passwordOk = bcrypt.compareSync(
        req.body.password,
        userToLogin.password
      );
      if (passwordOk) {
        delete userToLogin.password;
        delete userToLogin.confirmarPassword;
        req.session.userLoged = userToLogin;
        if (req.body.recordarme) {
          res.cookie("userEmail", req.body.email, { maxAge: (1000 * 60 ) * 10 });
        }

        return res.redirect("/");
      }

      return res.render("users/login", {
        errors: {
          email: {
            msg: "Las credenciales son invalidas",
          },
        },
      });
    }

    return res.render("users/login", {
      errors: {
        email: {
          msg: "Este correo no esta registrado",
        },
      },
    });
  },

  logout: (req, res) => {
    req.session.destroy();
    res.clearCookie("userEmail");
    return res.redirect("/");
  },

  register: (req, res) => {
    return res.render("users/register");
  },
  processRegister: (req, res) => {
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      return res.render("users/register", {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }
    const newUsuario = {
      nombre: req.body.name,
      apellido: req.body.lastName,
      email: req.body.email,
      telefono: req.body.telefono,
      password: bcrypt.hashSync(req.body.password, 10),    
      categoria: req.body.persona,
      confirmarPassword: req.body.confirmarPassword,
      avatar: req.file.filename,
    };
    newUsuario.categoria.trim();
    usersModel.create(newUsuario);
    res.redirect("/");
  },
};

module.exports = userController;
