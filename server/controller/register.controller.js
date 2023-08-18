const db = require("../config/mysql.config");
const { v4 } = require("uuid");
const ErrorHandler = require("../config/customErrorHandler.config");
const bcrypt = require("bcryptjs");
const registerUser = (req, res, next) => {
  const uid = v4();
  const { first_Name, last_Name, email, password } = req.body;
  bcrypt.hash(
    password,
    bcrypt.genSaltSync(10),
    (err, encyptedPassword) => {
      if (err) {
        next(new ErrorHandler());
      } else {
        db.query(
          `insert into user (uid,first_Name,last_Name,email,password) value ("${uid}","${first_Name}","${last_Name}","${email}","${encyptedPassword}")`,
          (err, result) => {
            if (err) {
              if (err.errno == 1062) {
                next(new ErrorHandler(err.message, 409));
              } else {
                next(new ErrorHandler());
              }
            } else {
              if (result.affectedRows === 1) {
                req.userInfo = { uid, email, first_Name, last_Name };
                next();
              }
            }
          }
        );
      }
    }
  );
};
module.exports = registerUser;
