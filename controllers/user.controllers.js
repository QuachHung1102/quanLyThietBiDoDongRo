const { User, sequelize } = require("../models/index");
const { Op } = require("sequelize");
// Mã hóa bcrypt
const bcrypt = require("bcrypt");
const saltRounds = 10;
// Jsonwebtoken
const jwt = require("jsonwebtoken");
const secretOrPrivateKey = process.env.JWT_SECRET_KEY;
const expiresIn = "24h";
// Gravatar-url
// const gravatarUrl = require('gravatar-url');
// md5
const md5 = require("md5");
const getGravatarURL = (email) => {
  // Trim leading and trailing whitespace from
  // an email address and force all characters
  // to lower case
  const address = String(email).trim().toLowerCase();

  // Create an MD5 hash of the final string
  const hash = md5(address);

  // Grab the actual image URL
  return `https://www.gravatar.com/avatar/${hash}`;
};

const getRegisterPage = async (req, res) => {
  try {
    res.status(200).render('auth/register', {
      pageTitle: 'Register',
      path: '/register',
      authPage: true,
    });
  } catch (error) {
    res.status(500).render('error', { error });
  }
}

const register = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;
  try {
    // Tạo avatar mặc định
    // const avatarUrl = gravatarUrl('quachhung389@gmail.com', { size: 200 });
    const avatarUrl = getGravatarURL(email);

    const hashPassword = bcrypt.hashSync(password, saltRounds);
    // Trên trang chủ khuyên dùng Asyn nhưng phải chuyển về promiss cho nên dùng luôn sync
    // console.log(hashPassword);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashPassword,
      avatar: avatarUrl,
      type: "client",
    });
    res.status(201).send(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getLoginPage = async (req, res) => {
  try {
    res.status(200).render('auth/login', {
      pageTitle: 'Login',
      path: '/login',
      authPage: true,
    });
  } catch (error) {
    res.status(500).render('error', { error });
  }
}

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign(
          { id: user.id, name: user.firstName + user.lastName, email: user.email, type: user.type, },
          secretOrPrivateKey,
          { expiresIn: expiresIn }
        );
        res.cookie('jwt', token, {
          httpOnly: true, // Bảo mật: ngăn JavaScript truy cập cookie
          // secure: process.env.NODE_ENV === 'production', // Chỉ gửi qua HTTPS trong production
          secure: false,
          sameSite: 'strict', // Ngăn chặn CSRF
          maxAge: 24 * 60 * 60 * 1000, // Thời gian sống của cookie (1 ngày)
          // domain: '.quanlydongroptc4.com',
        })
        res.status(200).json(
          {
            message: "Password Correct",
            token: token,
            user: {
              id: user.id,
              email: user.email,
              type: user.type,
              name: `${user.firstName} ${user.lastName}`,
              avatar: user.avatar,
            }
          }
        );
      } else {
        res.status(401).send("Invalid Password!");
      }
    } else {
      res.status(404).send("Not Found User!");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getAllUsers = async (req, res) => {
  const { lastName } = req.query;
  try {
    if (lastName) {
      const usersList = await User.findAll({
        where: {
          lastName: {
            [Op.like]: `%${lastName}%`,
          },
        },
      });
      res.status(200).send(usersList);
    } else {
      const allUser = await User.findAll();
      res.status(200).send(allUser);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllTripUser = async (req, res) => {
  try {
    const [results] = await sequelize.query(
      `select users.firstName, users.lastName, fromSta.name as "fromStation", toSta.name as "toStation", trips.price from users inner join tickets on users.id = tickets.user_id inner join trips on trips.id = tickets.trip_id inner join stations as fromSta on fromSta.id = trips.fromStation inner join stations as toSta on toSta.id = trips.toStation`
    );
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, password, phoneNumber } = req.body;
  try {
    const user = await User.findOne({ where: { id } });
    if (user) {
      const hashPassword = bcrypt.hashSync(password, saltRounds);
      await User.update(
        {
          firstName,
          lastName,
          email,
          password: hashPassword,
          phoneNumber,
        },
        { where: { id } }
      );
      const userUpdated = await User.findOne({ where: { id } });
      res.status(200).send(userUpdated);
    } else {
      res.status(404).send("Not Found User");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ where: { id } });
    if (user) {
      await User.destroy({ where: { id } });
      res.status(200).send("Successfully deleted");
    } else {
      res.status(404).send("Not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const uploadAvatar = async (req, res) => {
  const file = req.file;
  const { user } = req;
  try {
    if (!file) {
      res.status(400).send(`No file uploaded.`);
    } else {
      const urlImg = `http://localhost:3000/${file.path}`;
      const userFound = await User.findOne({
        where: { email: user.email },
      });
      userFound.avatar = urlImg;
      await userFound.save();
      res
        .status(200)
        .send({ message: "Upload avatar successful", userFound, urlImg });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const checkEmail = async function (req, res) {
  const matchEmail = req.body.email;
  try {
    const user = await User.findOne({
      where: { email: matchEmail },
    });
    res.status(200).send({ exists: !!user });
  } catch (error) {
    console.error('Error during email check:', error.message);
    res.status(500).send({ message: 'Internal server error', error: error.message });
  }
};

const checkPhone = async function (req, res) {
  const matchPhone = req.body.phoneNumber;
  try {
    const user = await User.findOne({
      where: { phoneNumber: matchPhone },
    });
    res.status(200).send({ exists: !!user });
  } catch (error) {
    console.error('Error during phone number check:', error.message);
    res.status(500).send({ message: 'Internal server error', error: error.message });
  }
};

module.exports = {
  getRegisterPage,
  register,
  getLoginPage,
  login,
  getAllUsers,
  updateUser,
  deleteUser,
  uploadAvatar,
  getAllTripUser,
  checkEmail,
  checkPhone,
};
